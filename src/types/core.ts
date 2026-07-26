// src/types/core.ts

/**
 * Base Entity representing fields that exist on every database record.
 * This guarantees multi-tenancy (tenantId) and audit trails from Day 1.
 */
export interface BaseEntity {
  id: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Standardized pagination response for all Repository queries.
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  hasMore: boolean;
  nextCursor?: string;
}

/**
 * Generic response wrapper for Next.js Server Actions
 */
export type ActionResponse<T = undefined> = 
  | { success: true; data?: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };