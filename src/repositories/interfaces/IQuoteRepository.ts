import { IBaseRepository } from './IBaseRepository';
import { QuoteEntity, QuoteStatus } from '@/domains/quotes/entities/QuoteEntity';

export interface IQuoteRepository extends IBaseRepository<QuoteEntity> {
  findByStatus(tenantId: string, status: QuoteStatus): Promise<QuoteEntity[]>;
  findByCustomerPhone(tenantId: string, phone: string): Promise<QuoteEntity[]>;
  assignTechnician(quoteId: string, technicianId: string): Promise<QuoteEntity>;
  updateStatus(quoteId: string, newStatus: QuoteStatus): Promise<QuoteEntity>;
}