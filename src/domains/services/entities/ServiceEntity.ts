import { BaseEntity } from '@/types/core';

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceEntity extends BaseEntity {
  title: string;          // e.g., "CCTV Installation"
  slug: string;           // e.g., "cctv-installation"
  shortDescription: string;
  longDescription: string;
  coverImageUrl?: string;
  basePriceRWF?: number;
  features: string[];     // e.g., ["Mobile View", "Night Vision", "2TB Storage"]
  faqs: ServiceFaq[];
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
  };
  isActive: boolean;
}