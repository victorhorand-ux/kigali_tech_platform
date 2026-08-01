"use server";

import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// 1. Safely initialize Firebase (reusing your existing pattern)
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

export async function getQuotesAction() {
  try {
    const db = getDb();
    
    // Fetch quotes, newest first
    const snapshot = await db.collection('quotes')
      .orderBy('createdAt', 'desc')
      .get();

    // Map the Firestore documents into standard JavaScript objects
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert complex Firestore Timestamps to standard ISO strings for React
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("🚨 Error fetching quotes from CRM:", error);
    return [];
  }
}