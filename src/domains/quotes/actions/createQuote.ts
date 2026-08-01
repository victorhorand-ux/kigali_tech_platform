// src/actions/createQuote.ts
"use server";

import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { CreateQuoteDTO } from "@/domains/quotes/schemas/quote.schema";

// 1. Lazy-load Firebase to prevent top-level crashes
function getDb() {
  if (getApps().length === 0) {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY) {
      throw new Error("🚨 Firebase Environment variables are missing!");
    }

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }
  return getFirestore();
}

export async function submitQuoteAction(data: CreateQuoteDTO) {
  try {
    console.log("📥 Received new quote request on server:", data);

    // Initialize DB safely inside the execution context
    const db = getDb(); 

    // Insert directly into Firestore
    const docRef = await db.collection('quotes').add({
      ...data,
      tenantId: 'rw-hq-main',
      status: 'pending', 
      createdAt: FieldValue.serverTimestamp(),
    });

    return { 
      success: true, 
      message: "Our team will contact you shortly on the provided phone number." 
    };
    
  } catch (error: any) {
        return { 
      success: false, 
      error: "Failed to submit quote to the database. Please try again." 
    };
  }
}