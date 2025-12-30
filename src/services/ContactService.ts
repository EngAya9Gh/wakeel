import { ContactSubmission } from '@prisma/client';
import { IContactRepository } from '@/repositories/IContactRepository';
import { ContactRepository } from '@/repositories/ContactRepository';

export class ContactService {
    private contactRepository: IContactRepository;

    constructor(contactRepository: IContactRepository = new ContactRepository()) {
        this.contactRepository = contactRepository;
    }

    async submitContactForm(name: string, email: string, message: string, subject?: string, phone?: string): Promise<ContactSubmission> {
        return this.contactRepository.create({
            name,
            email,
            message,
            subject: subject || null,
            phone: phone || null,
        });
    }

    async getAllSubmissions(): Promise<ContactSubmission[]> {
        return this.contactRepository.findAll();
    }
}
