import { IBaseRepository } from './IBaseRepository';
import { ServiceEntity } from '@/domains/services/entities/ServiceEntity';

export interface IServiceRepository extends IBaseRepository<ServiceEntity> {
  findBySlug(tenantId: string, slug: string): Promise<ServiceEntity | null>;
  findActiveServices(tenantId: string): Promise<ServiceEntity[]>;
}