import { PaginatedResult } from '@/types/core';

export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(tenantId: string, limit?: number, cursor?: string): Promise<PaginatedResult<T>>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}