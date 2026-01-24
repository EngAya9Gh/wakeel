import { ContactSubmission } from '@prisma/client';
import { IContactRepository } from '@/repositories/IContactRepository';
import { ContactRepository } from '@/repositories/ContactRepository';
import { CRMService } from './CRMService';

export class ContactService {
    private contactRepository: IContactRepository;
    private crmService: CRMService;

    constructor(contactRepository: IContactRepository = new ContactRepository()) {
        this.contactRepository = contactRepository;
        this.crmService = new CRMService();
    }

    async submitContactForm(name: string, email: string, message: string, subject?: string, phone?: string): Promise<ContactSubmission> {
        // Save to our database first (primary operation)
        const submission = await this.contactRepository.create({
            name,
            email,
            message,
            subject: subject || null,
            phone: phone || null,
        });

        // Send to CRM silently in background (fire-and-forget)
        // This will NOT throw errors or affect user experience
        const crmData = CRMService.createContactFormLead(name, email, message, subject, phone);
        this.crmService.sendLeadToCRM(crmData);

        return submission;
    }

    async getAllSubmissions(): Promise<ContactSubmission[]> {
        return this.contactRepository.findAll();
    }
}
