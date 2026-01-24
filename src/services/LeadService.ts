import { Lead } from '@prisma/client';
import { ILeadRepository } from '@/repositories/ILeadRepository';
import { LeadRepository } from '@/repositories/LeadRepository';
import { CRMService } from './CRMService';

export class LeadService {
    private leadRepository: ILeadRepository;
    private crmService: CRMService;

    constructor(leadRepository: ILeadRepository = new LeadRepository()) {
        this.leadRepository = leadRepository;
        this.crmService = new CRMService();
    }

    async createLead(email: string, name?: string, phone?: string, source: string = 'landing_page'): Promise<Lead> {
        // Save to our database first (primary operation)
        const lead = await this.leadRepository.create({
            email,
            name: name || null,
            phone: phone || null,
            source,
        });

        // Send to CRM silently in background (fire-and-forget)
        // This will NOT throw errors or affect user experience
        if (name && phone) {
            // Filter out placeholder emails before sending to CRM
            const isPlaceholder = email.includes('@placeholder.com');
            const crmEmail = isPlaceholder ? undefined : email;

            const crmData = CRMService.createLandingPageLead(name, phone, crmEmail);
            this.crmService.sendLeadToCRM(crmData);
        }

        return lead;
    }

    async getAllLeads(): Promise<Lead[]> {
        return this.leadRepository.findAll();
    }
}
