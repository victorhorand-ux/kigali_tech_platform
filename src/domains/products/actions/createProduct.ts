
"use server";

import { getFirestore, FieldValue } from 'firebase-admin/firestore';
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

export async function createProductAction(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const price = formData.get('price') as string;
    const status = formData.get('status') as string;

    if (!name || !category || !price) {
      return { success: false, error: "Missing required fields" };
    }

    const db = getDb();

    await db.collection('products').add({
      name,
      category,
      price,
      status,
      tenantId: 'rw-hq-main',
      createdAt: FieldValue.serverTimestamp(),
    });

    // Instantly refresh the shop and admin pages so the new product appears
    revalidatePath('/shop');
    revalidatePath('/admin');

    return { success: true };
  } catch (error) {
    console.error("🚨 Error adding product:", error);
    return { success: false, error: "Failed to add product" };
  }
}