// scripts/seedProducts.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// 1. Initialize Firebase Admin (Modern Modular Syntax)
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

const productsToSeed = [
  {
    tenantId: DEFAULT_TENANT_ID,
    name: "Samsung 65\" Crystal 4K UHD Smart TV",
    slug: "samsung-65-crystal-4k-uhd",
    sku: "SAM-65-CU8000",
    brand: "Samsung",
    category: "tvs",
    basePriceRWF: 950000,
    salePriceRWF: 890000,
    inventoryCount: 12,
    isAvailable: true,
    images: ["https://placehold.co/600x400/png?text=Samsung+65+Inch+TV"],
    shortDescription: "Immersive 4K UHD resolution with Crystal Processor 4K and ultra-thin profile.",
    longDescription: "Transform your living room into a cinema with the Samsung 65\" Crystal 4K UHD TV. Featuring Dynamic Crystal Color for lifelike images, a sleek AirSlim design, and built-in Smart Hub for all your streaming apps.",
    specifications: [
      { name: "Screen Size", value: "65 Inches" },
      { name: "Resolution", value: "4K Ultra HD (3840 x 2160)" },
      { name: "Smart OS", value: "Tizen" },
      { name: "HDMI Ports", value: "3" }
    ],
    warrantyMonths: 24,
    hasInstallationOption: true,
    installationFeeRWF: 25000,
    seoMeta: {
      title: "Samsung 65\" 4K Smart TV | Buy in Kigali",
      description: "Buy the Samsung 65 inch Crystal 4K UHD Smart TV in Rwanda. Features Tizen OS, slim design, and optional wall mounting.",
      keywords: ["Samsung TV Kigali", "Buy TV Rwanda", "65 inch TV Kigali"]
    },
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  },
  {
    tenantId: DEFAULT_TENANT_ID,
    name: "Hikvision 4-Camera 5MP ColorVu CCTV Kit",
    slug: "hikvision-4-camera-5mp-colorvu-kit",
    sku: "HIK-5MP-KIT-4",
    brand: "Hikvision",
    category: "cctv-cameras",
    basePriceRWF: 280000,
    inventoryCount: 8,
    isAvailable: true,
    images: ["https://placehold.co/600x400/png?text=Hikvision+CCTV+Kit"],
    shortDescription: "Complete 4-camera security system featuring 24/7 color night vision.",
    longDescription: "Secure your premises with the Hikvision 5MP ColorVu kit. This complete bundle includes 4 high-definition cameras that capture full-color video even in total darkness, a 4-channel DVR, and a 1TB surveillance hard drive.",
    specifications: [
      { name: "Resolution", value: "5 Megapixels" },
      { name: "Night Vision", value: "ColorVu (24/7 Color)" },
      { name: "Storage", value: "1TB HDD Included" },
      { name: "Remote Viewing", value: "Hik-Connect App" }
    ],
    warrantyMonths: 12,
    hasInstallationOption: true,
    installationFeeRWF: 80000,
    seoMeta: {
      title: "Hikvision 5MP ColorVu CCTV Kit | Security Kigali",
      description: "Complete Hikvision 4-camera ColorVu security system. Get 24/7 color night vision for your home or business in Kigali.",
      keywords: ["Hikvision Kigali", "CCTV Kit Rwanda", "Security Cameras Kigali"]
    },
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }
];

async function seedDatabase() {
  console.log("🛒 Starting Products seed...");
  const batch = db.batch();

  for (const product of productsToSeed) {
    const existing = await db.collection('products').where('slug', '==', product.slug).limit(1).get();

    if (existing.empty) {
      const newRef = db.collection('products').doc();
      batch.set(newRef, product);
      console.log(`✅ Queued Product: ${product.name}`);
    } else {
      console.log(`⚠️ Skipped Product: ${product.name} (Already exists)`);
    }
  }

  await batch.commit();
  console.log("🎉 Products Seed complete!");
  process.exit(0);
}

seedDatabase().catch(console.error);