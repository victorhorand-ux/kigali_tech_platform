// src/domains/quotes/actions/createQuote.ts
"use server";

import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { CreateQuoteDTO } from "@/domains/quotes/schemas/quote.schema";
import { Resend } from 'resend';

// Initialize Resend safely
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
    // Initialize DB safely inside the execution context
    const db = getDb(); 

    // Insert directly into Firestore
    const docRef = await db.collection('quotes').add({
      ...data,
      tenantId: 'rw-hq-main',
      status: 'pending', 
      createdAt: FieldValue.serverTimestamp(),
    });
    
    // 2. Fire off the email notification instantly
    try {
      if (resend && process.env.ADMIN_EMAIL) {
        const emailResponse = await resend.emails.send({
          from: 'KigaliTech CRM <onboarding@resend.dev>', // Free testing email from Resend
          to: process.env.ADMIN_EMAIL,
          subject: `🚨 New Lead: ${data.serviceRequested} from ${data.customerName}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2 style="color: #0B1B3D;">New Quote Request</h2>
              <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
                <p><strong>Customer:</strong> ${data.customerName}</p>
                <p><strong>Phone:</strong> ${data.customerPhone}</p>
                <p><strong>Service:</strong> ${data.serviceRequested}</p>
                <p><strong>Location:</strong> ${data.location?.district || 'N/A'}, ${data.location?.sector || 'N/A'}</p>
                <p><strong>Notes:</strong> ${data.notes || 'None provided'}</p>
              </div>
            </div>
          `
        });
      } else {
      }
    } catch (emailError) {
    }

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