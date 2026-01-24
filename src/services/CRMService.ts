/**
 * CRM Integration Service
 * Sends lead data to external CRM system silently (fire-and-forget)
 * Does NOT block or affect user experience if CRM fails
 */

const CRM_BASE_URL = process.env.CRM_BASE_URL || 'https://honeydew-sheep-602146.hostingersite.com';
const CRM_API_KEY = process.env.CRM_API_KEY || 'JlQlzqUN1HFfeenMO5Iz8eJYMtOMxPnE772sqxJ';
const CRM_ENDPOINT = '/api/public/v1/leads';

interface CRMLeadData {
    name: string;
    phone: string;
    source: 'contact_form' | 'landing_page' | 'website_form';
    email?: string;
    subject?: string;
    message?: string;
    company?: string;
    address?: string;
}

export class CRMService {
    /**
     * Send lead to CRM silently (fire-and-forget)
     * Logs errors but does NOT throw exceptions
     */
    async sendLeadToCRM(data: CRMLeadData): Promise<void> {
        // Fire and forget - don't await, don't block
        this.sendAsync(data).catch((error) => {
            // Log error silently, don't propagate
            console.error('[CRM Integration] Failed to send lead:', {
                error: error.message,
                data: { name: data.name, phone: data.phone, source: data.source }
            });
        });
    }

    /**
     * Internal async method to send data to CRM
     */
    private async sendAsync(data: CRMLeadData): Promise<void> {
        try {
            const url = `${CRM_BASE_URL}${CRM_ENDPOINT}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': CRM_API_KEY,
                    'Authorization': `Bearer ${CRM_API_KEY}`, // Fallback header
                },
                body: JSON.stringify(data),
                // Increased timeout to 30 seconds as the CRM might be slow
                signal: AbortSignal.timeout(30000),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('[CRM Integration] Lead sent successfully:', {
                    lead_id: result.data?.lead_id,
                    name: data.name,
                    source: data.source
                });
            } else {
                // Log non-200 responses but don't throw
                const errorText = await response.text().catch(() => 'Unknown error');
                console.warn('[CRM Integration] CRM returned non-success status:', {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText,
                    data: { name: data.name, phone: data.phone }
                });
            }
        } catch (error: any) {
            // Catch all errors (network, timeout, etc.) and log them
            console.error('[CRM Integration] Exception during CRM send:', {
                error: error.message,
                name: error.name,
                data: { name: data.name, phone: data.phone, source: data.source }
            });
            // Don't rethrow - this is fire-and-forget
        }
    }

    /**
     * Helper: Create lead data for Contact Form
     */
    static createContactFormLead(
        name: string,
        email: string,
        message: string,
        subject?: string,
        phone?: string
    ): CRMLeadData {
        return {
            name,
            phone: phone || '', // CRM requires phone, use empty if not provided
            email,
            subject,
            message,
            source: 'contact_form',
        };
    }

    /**
     * Helper: Create lead data for Landing Page
     */
    static createLandingPageLead(
        name: string,
        phone: string,
        email?: string
    ): CRMLeadData {
        return {
            name,
            phone,
            email,
            source: 'landing_page',
        };
    }
}
