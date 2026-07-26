import { BaseEntity } from '@/types/core';

export type QuoteStatus = 
  | 'lead' 
  | 'qualified' 
  | 'site_visit' 
  | 'quotation_sent' 
  | 'negotiation' 
  | 'won' 
  | 'completed';

export interface QuoteEntity extends BaseEntity {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceRequested: string;
  location: {
    district: string;
    sector: string;
    address?: string;
  };
  urgency: 'low' | 'medium' | 'high';
  status: QuoteStatus;
  notes?: string;
  assignedTechnicianId?: string;
}