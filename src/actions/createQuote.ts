"use server";

import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { CreateQuoteDTO } from "@/domains/quotes/schemas/quote.schema";

// Ensure Firebase Admin is initialized in the server environment
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export async function submitQuoteAction(data: CreateQuoteDTO) {
  try {
    // Basic server-side validation backup
    if (!data.customerName || !data.customerPhone || !data.serviceRequested) {
      return { success: false, error: "Missing required fields" };
    }

    // Insert directly into Firestore using the structured DTO
    await db.collection('quotes').add({
      ...data,
      tenantId: 'rw-hq-main',
      status: 'pending', // Tracks the lead status in your CRM
      createdAt: FieldValue.serverTimestamp(),
    });

    return { 
      success: true, 
      message: "Our team will contact you shortly on the provided phone number." 
    };
  } catch (error) {
    console.error("Quote Submission Error:", error);
    return { 
      success: false, 
      error: "Failed to submit quote. Please try again." 
    };
  }
}