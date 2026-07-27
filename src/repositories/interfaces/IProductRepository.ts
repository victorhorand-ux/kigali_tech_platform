import { IBaseRepository } from './IBaseRepository';
import { ProductEntity } from '@/domains/products/entities/ProductEntity';
import { PaginatedResult } from '@/types/core';

export interface IProductRepository extends IBaseRepository<ProductEntity> {
  findBySlug(tenantId: string, slug: string): Promise<ProductEntity | null>;
  findByCategory(tenantId: string, category: string, limit?: number): Promise<PaginatedResult<ProductEntity>>;
  findByBrand(tenantId: string, brand: string, limit?: number): Promise<PaginatedResult<ProductEntity>>;
  
  // For the homepage "Featured Products" sections
  findFeatured(tenantId: string, limit?: number): Promise<ProductEntity[]>;
}