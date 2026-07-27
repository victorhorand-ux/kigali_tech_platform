import { BaseEntity } from '@/types/core';

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceEntity extends BaseEntity {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  coverImageUrl?: string;
  basePriceRWF?: number;
  features: string[];
  faqs: ServiceFaq[];
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
  };
  isActive: boolean;
}