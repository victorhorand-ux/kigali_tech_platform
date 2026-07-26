// src/domains/quotes/actions/createQuote.ts
"use server";

import { CreateQuoteSchema } from '../schemas/quote.schema'; 
import { QuoteService } from '../services/QuoteService';
import { FirestoreQuoteRepository } from '@/repositories/implementations/firebase/FirestoreQuoteRepository';
import { ActionResponse } from '@/types/core';

// Hardcoded for now. Useful when you scale to multiple franchise locations.
const DEFAULT_TENANT_ID = 'rw-hq-main'; 

export async function submitQuoteAction(formData: unknown): Promise<ActionResponse<{ leadId: string }>> {
  try {
    // 1. Strict Server-Side Validation
    const validatedData = CreateQuoteSchema.safeParse(formData);

    if (!validatedData.success) {
      return {
        success: false,
        error: "Please check the form for errors.",
        fieldErrors: validatedData.error.flatten().fieldErrors,
      };
    }

    // 2. Manual Dependency Injection (Wiring the layers together)
    const repository = new FirestoreQuoteRepository();
    const service = new QuoteService(repository);

    // 3. Execute the Use Case
    const newLead = await service.processNewQuoteRequest(DEFAULT_TENANT_ID, validatedData.data);

    return {
      success: true,
      data: { leadId: newLead.id },
      message: "Your request has been received. Our technician will contact you shortly."
    };
    
  } catch (error) {
    console.error("[Quote Submission Error]:", error);
    return {
      success: false,
      error: "An unexpected error occurred while submitting your request. Please try again or contact us via WhatsApp."
    };
  }
}