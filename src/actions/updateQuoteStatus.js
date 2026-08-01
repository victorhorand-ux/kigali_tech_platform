"use server";

import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { revalidatePath } from 'next/cache';

function getDb() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return getFirestore();
}

export async function updateQuoteStatusAction(id, newStatus) {
  try {
    const db = getDb();
    
    // Update the specific document
    await db.collection('quotes').doc(id).update({
      status: newStatus,
    });

    // Instantly refresh the data on the admin route
    revalidatePath('/admin');
    
    return { success: true };
  } catch (error) {
    console.error("🚨 Error updating quote status:", error);
    return { success: false, error: "Failed to update status." };
  }
}