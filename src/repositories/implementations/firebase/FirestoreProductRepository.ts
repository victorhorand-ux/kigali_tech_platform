// src/repositories/implementations/firebase/FirestoreProductRepository.ts
import { db } from '@/infrastructure/firebase/admin';
import { IProductRepository } from '@/repositories/interfaces/IProductRepository';
import { ProductEntity } from '@/domains/products/entities/ProductEntity';
import { PaginatedResult } from '@/types/core';

export class FirestoreProductRepository implements IProductRepository {
  private readonly collectionName = 'products';

  private mapToEntity(doc: FirebaseFirestore.DocumentSnapshot): ProductEntity {
    const data = doc.data()!;
    return {
      id: doc.id,
      tenantId: data.tenantId,
      name: data.name,
      slug: data.slug,
      sku: data.sku,
      brand: data.brand,
      category: data.category,
      basePriceRWF: data.basePriceRWF,
      salePriceRWF: data.salePriceRWF,
      inventoryCount: data.inventoryCount,
      isAvailable: data.isAvailable,
      images: data.images || [],
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      specifications: data.specifications || [],
      warrantyMonths: data.warrantyMonths,
      hasInstallationOption: data.hasInstallationOption,
      installationFeeRWF: data.installationFeeRWF,
      seoMeta: data.seoMeta,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  }

  async findBySlug(tenantId: string, slug: string): Promise<ProductEntity | null> {
    const snapshot = await db.collection(this.collectionName)
      .where('tenantId', '==', tenantId)
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    return this.mapToEntity(snapshot.docs[0]);
  }

  async findByCategory(tenantId: string, category: string, limit: number = 12): Promise<PaginatedResult<ProductEntity>> {
    const snapshot = await db.collection(this.collectionName)
      .where('tenantId', '==', tenantId)
      .where('category', '==', category)
      .where('isAvailable', '==', true)
      .limit(limit)
      .get();
      
    // FIX: Added explicit type to 'doc'
    const data = snapshot.docs.map((doc: FirebaseFirestore.DocumentSnapshot) => this.mapToEntity(doc));
    
    return { data, total: data.length, hasMore: false };
  }

  async findByBrand(tenantId: string, brand: string, limit: number = 12): Promise<PaginatedResult<ProductEntity>> {
    const snapshot = await db.collection(this.collectionName)
      .where('tenantId', '==', tenantId)
      .where('brand', '==', brand)
      .where('isAvailable', '==', true)
      .limit(limit)
      .get();
      
    // FIX: Added explicit type to 'doc'
    const data = snapshot.docs.map((doc: FirebaseFirestore.DocumentSnapshot) => this.mapToEntity(doc));
    
    return { data, total: data.length, hasMore: false };
  }

  async findFeatured(tenantId: string, limit: number = 4): Promise<ProductEntity[]> {
    const snapshot = await db.collection(this.collectionName)
      .where('tenantId', '==', tenantId)
      .where('isAvailable', '==', true)
      .limit(limit)
      .get();
      
    // FIX: Added explicit type to 'doc'
    return snapshot.docs.map((doc: FirebaseFirestore.DocumentSnapshot) => this.mapToEntity(doc));
  }

  async create(data: Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductEntity> {
    const timestamp = new Date();
    const firestoreData = { ...data, createdAt: timestamp, updatedAt: timestamp };
    const docRef = await db.collection(this.collectionName).add(firestoreData);
    const newDoc = await docRef.get();
    return this.mapToEntity(newDoc);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const doc = await db.collection(this.collectionName).doc(id).get();
    if (!doc.exists) return null;
    return this.mapToEntity(doc);
  }

  async update(id: string, data: Partial<ProductEntity>): Promise<ProductEntity> { throw new Error('Not implemented'); }
  async delete(id: string): Promise<void> { throw new Error('Not implemented'); }
  async findAll(): Promise<PaginatedResult<ProductEntity>> { throw new Error('Not implemented'); }
}