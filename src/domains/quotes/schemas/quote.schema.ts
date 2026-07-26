import { z } from 'zod';

export const CreateQuoteSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().regex(/^(078|079|072|073)\d{7}$/, "Must be a valid Rwandan mobile number"),
  customerEmail: z.string().email("Invalid email").optional().or(z.literal('')),
  serviceRequested: z.string().min(3, "Service type is required"),
  location: z.object({
    district: z.string().min(2, "District is required"),
    sector: z.string().min(2, "Sector is required"),
    address: z.string().optional(),
  }),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional().or(z.literal('')),
});

export type CreateQuoteDTO = z.infer<typeof CreateQuoteSchema>;