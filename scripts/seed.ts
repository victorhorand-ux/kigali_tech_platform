// scripts/seed.ts
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd()); // Force load .env.local

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// 1. Initialize Firebase Admin
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
const DEFAULT_TENANT_ID = 'rw-hq-main';

const servicesToSeed = [
  {
    tenantId: DEFAULT_TENANT_ID,
    title: "CCTV Installation & Configuration",
    slug: "cctv-installation",
    shortDescription: "Professional security camera mounting, wiring, and mobile app setup for your property.",
    longDescription: "Protect your home or business with our expert CCTV installation services. Our certified technicians handle everything from optimal camera placement and secure wiring to DVR/NVR configuration and setting up mobile access so you can monitor your property from anywhere.",
    coverImageUrl: "https://placehold.co/600x400/png?text=CCTV+Installation",
    basePriceRWF: 50000,
    isActive: true,
    features: [
      "Site security assessment & camera placement",
      "Professional mounting and concealed wiring",
      "DVR/NVR system configuration",
      "Mobile app setup for remote viewing",
      "Post-installation training"
    ],
    faqs: [
      { 
        question: "How long does a standard installation take?", 
        answer: "A standard 4-camera setup typically takes between 4 to 6 hours depending on the complexity of the wiring and property layout." 
      },
      { 
        question: "Do you provide the cameras or just the installation?", 
        answer: "We offer both! You can purchase a complete CCTV kit from our shop, or hire us to install equipment you have already purchased." 
      }
    ],
    seoMeta: {
      title: "CCTV Installation Services | Kigali Tech",
      description: "Professional CCTV and security camera installation services in Kigali, Rwanda.",
      keywords: ["CCTV installation Kigali", "Security cameras Rwanda", "Tech installation"]
    },
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  },
  {
    tenantId: DEFAULT_TENANT_ID,
    title: "Smart TV Wall Mounting",
    slug: "smart-tv-mounting",
    shortDescription: "Secure wall mounting and cable management for all TV sizes.",
    longDescription: "Maximize your living space and enhance your viewing experience with our professional TV wall mounting service. We ensure your television is perfectly leveled, securely anchored to the correct wall type, and that all messy cables are neatly managed.",
    coverImageUrl: "https://placehold.co/600x400/png?text=TV+Mounting",
    basePriceRWF: 25000,
    isActive: true,
    features: [
      "Secure bracket installation",
      "Perfect leveling and positioning",
      "Basic cable management",
      "Smart TV internet connection setup"
    ],
    faqs: [
      { 
        question: "Do I need to buy the wall bracket separately?", 
        answer: "We recommend purchasing a bracket that fits your specific TV size, but we can also supply standard tilting or full-motion brackets upon request." 
      }
    ],
    seoMeta: {
      title: "TV Wall Mounting Services | Kigali Tech",
      description: "Safe and secure Smart TV wall mounting and setup in Kigali.",
      keywords: ["TV mounting Kigali", "Smart TV setup", "Home theater installation"]
    },
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }
];

async function seedServices() {
  console.log("🛠️ Starting Services seed...");
  const batch = db.batch();

  for (const service of servicesToSeed) {
    const existing = await db.collection('services').where('slug', '==', service.slug).limit(1).get();

    if (existing.empty) {
      const newRef = db.collection('services').doc();
      batch.set(newRef, service);
      console.log(`✅ Queued Service: ${service.title}`);
    } else {
      console.log(`⚠️ Skipped Service: ${service.title} (Already exists)`);
    }
  }

  await batch.commit();
  console.log("🎉 Services Seed complete!");
  process.exit(0);
}

seedServices().catch((error) => {
  console.error("🚨 Error seeding services:", error);
  process.exit(1);
});