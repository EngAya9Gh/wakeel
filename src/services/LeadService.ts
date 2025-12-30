import { Lead } from '@prisma/client';
import { ILeadRepository } from '@/repositories/ILeadRepository';
import { LeadRepository } from '@/repositories/LeadRepository';

export class LeadService {
    private leadRepository: ILeadRepository;

    constructor(leadRepository: ILeadRepository = new LeadRepository()) {
        this.leadRepository = leadRepository;
    }

    async createLead(email: string, name?: string, phone?: string, source: string = 'landing_page'): Promise<Lead> {
        // Add business logic here, e.g., validation, email notification, etc.
        return this.leadRepository.create({
            email,
            name: name || null,
            phone: phone || null,
            source,
        });
    }

    async getAllLeads(): Promise<Lead[]> {
        return this.leadRepository.findAll();
    }
}
