// src/domains/quotes/services/QuoteService.ts
import { IQuoteRepository } from '@/repositories/interfaces/IQuoteRepository'; 
import { CreateQuoteDTO } from '@/domains/quotes/schemas/quote.schema';
import { QuoteEntity } from '../entities/QuoteEntity'; 

export class QuoteService {
  // Dependency Injection: The service expects ANY repository that matches the interface
  constructor(private quoteRepository: IQuoteRepository) {}

  async processNewQuoteRequest(tenantId: string, data: CreateQuoteDTO): Promise<QuoteEntity> {
    // 1. Business logic & Default state assignment
    const newQuote = await this.quoteRepository.create({
      tenantId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      serviceRequested: data.serviceRequested,
      location: data.location,
      urgency: data.urgency,
      status: 'lead', // Every new submission starts at the 'lead' stage
      notes: data.notes,
    });

    // Future enhancement: 
    // EventBus.publish('QuoteCreated', { quoteId: newQuote.id, phone: data.customerPhone });

    return newQuote;
  }
}