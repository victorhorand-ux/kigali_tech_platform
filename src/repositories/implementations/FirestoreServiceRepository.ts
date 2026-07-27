// src/repositories/implementations/firebase/FirestoreServiceRepository.ts
import { db } from '@/infrastructure/firebase/admin';
import { IServiceRepository } from '@/repositories/interfaces/IServiceRepository';
import { ServiceEntity } from '@/domains/services/entities/ServiceEntity';
import { PaginatedResult } from '@/types/core';

export class FirestoreServiceRepository implements IServiceRepository {
  private readonly collectionName = 'services';

  private mapToEntity(doc: FirebaseFirestore.DocumentSnapshot): ServiceEntity {
    const data = doc.data()!;
    return {
      id: doc.id,
      tenantId: data.tenantId,
      title: data.title,
      slug: data.slug,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      coverImageUrl: data.coverImageUrl,
      basePriceRWF: data.basePriceRWF,
      features: data.features || [],
      faqs: data.faqs || [],
      seoMeta: data.seoMeta,
      isActive: data.isActive,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  }

  async findBySlug(tenantId: string, slug: string): Promise<ServiceEntity | null> {
    const snapshot = await db.collection(this.collectionName)
      .where('tenantId', '==', tenantId)
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    return this.mapToEntity(snapshot.docs[0]);
  }

  async findActiveServices(tenantId: string): Promise<ServiceEntity[]> {
    const snapshot = await db.collection(this.collectionName)
      .where('tenantId', '==', tenantId)
      .where('isActive', '==', true)
      .get();
      
    // FIX: Added explicit type to 'doc'
    return snapshot.docs.map((doc: FirebaseFirestore.DocumentSnapshot) => this.mapToEntity(doc));
  }

  async create(data: Omit<ServiceEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ServiceEntity> {
    const timestamp = new Date();
    const firestoreData = { ...data, createdAt: timestamp, updatedAt: timestamp };
    const docRef = await db.collection(this.collectionName).add(firestoreData);
    const newDoc = await docRef.get();
    return this.mapToEntity(newDoc);
  }

  async findById(id: string): Promise<ServiceEntity | null> {
    const doc = await db.collection(this.collectionName).doc(id).get();
    if (!doc.exists) return null;
    return this.mapToEntity(doc);
  }

  // Required interface methods (abbreviated for the core feature)
  async update(id: string, data: Partial<ServiceEntity>): Promise<ServiceEntity> { throw new Error('Not implemented'); }
  async delete(id: string): Promise<void> { throw new Error('Not implemented'); }
  async findAll(): Promise<PaginatedResult<ServiceEntity>> { throw new Error('Not implemented'); }
}