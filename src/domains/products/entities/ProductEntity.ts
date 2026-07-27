import { BaseEntity } from '@/types/core';

export interface ProductSpecification {
  name: string;      // e.g., "Screen Size", "Resolution", "Night Vision"
  value: string;     // e.g., "65 Inches", "4K UHD", "Up to 30m"
}

export interface ProductEntity extends BaseEntity {
  name: string;
  slug: string;
  sku: string;
  brand: string;           // e.g., "Samsung", "Hikvision"
  category: string;        // e.g., "tvs", "cctv-cameras"
  
  // Pricing & Stock
  basePriceRWF: number;
  salePriceRWF?: number;   // Optional discount price
  inventoryCount: number;
  isAvailable: boolean;
  
  // Media & Details
  images: string[];        // Array of optimized image URLs
  shortDescription: string;
  longDescription: string;
  
  // E-Commerce specifics
  specifications: ProductSpecification[];
  warrantyMonths: number;
  hasInstallationOption: boolean;
  installationFeeRWF?: number;
  
  // SEO
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
  };
}