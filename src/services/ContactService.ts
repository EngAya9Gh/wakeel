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

        // Send to CRM (await it to ensure Next.js doesn't kill the background process)
        // Wrapped in try/catch in CRMService so it won't throw errors to the user
        const crmData = CRMService.createContactFormLead(name, email, message, subject, phone);
        await this.crmService.sendLeadToCRM(crmData);

        return submission;
    }

    async getAllSubmissions(): Promise<ContactSubmission[]> {
        return this.contactRepository.findAll();
    }
}
