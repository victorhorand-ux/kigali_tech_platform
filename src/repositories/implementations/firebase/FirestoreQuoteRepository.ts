// src/repositories/implementations/firebase/FirestoreQuoteRepository.ts
import { db } from '@/infrastructure/firebase/admin';
import { IQuoteRepository } from '@/repositories/interfaces/IQuoteRepository';  
import { QuoteEntity, QuoteStatus } from '@/domains/quotes/entities/QuoteEntity';
import { PaginatedResult } from '@/types/core';

export class FirestoreQuoteRepository implements IQuoteRepository {
  private readonly collectionName = 'quotes';

  private mapToEntity(doc: FirebaseFirestore.DocumentSnapshot): QuoteEntity {
    const data = doc.data()!;
    return {
      id: doc.id,
      tenantId: data.tenantId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      serviceRequested: data.serviceRequested,
      location: data.location,
      urgency: data.urgency,
      status: data.status as QuoteStatus,
      notes: data.notes,
      assignedTechnicianId: data.assignedTechnicianId,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  }

  async create(data: Omit<QuoteEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<QuoteEntity> {
    const timestamp = new Date();
    
    const firestoreData = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const docRef = await db.collection(this.collectionName).add(firestoreData);
    const newDoc = await docRef.get();
    
    return this.mapToEntity(newDoc);
  }

  async findById(id: string): Promise<QuoteEntity | null> {
    const doc = await db.collection(this.collectionName).doc(id).get();
    if (!doc.exists) return null;
    return this.mapToEntity(doc);
  }

  async updateStatus(quoteId: string, newStatus: QuoteStatus): Promise<QuoteEntity> {
    const docRef = db.collection(this.collectionName).doc(quoteId);
    
    await docRef.update({
      status: newStatus,
      updatedAt: new Date()
    });

    const updatedDoc = await docRef.get();
    return this.mapToEntity(updatedDoc);
  }

  async findAll(tenantId: string, limit: number = 10, cursor?: string): Promise<PaginatedResult<QuoteEntity>> {
    let query = db.collection(this.collectionName)
      .where('tenantId', '==', tenantId)
      .orderBy('createdAt', 'desc')
      .limit(limit);

    if (cursor) {
      const cursorDoc = await db.collection(this.collectionName).doc(cursor).get();
      if (cursorDoc.exists) {
        query = query.startAfter(cursorDoc);
      }
    }

    const snapshot = await query.get();
    
    // FIX: Added explicit type to 'doc'
    const data = snapshot.docs.map((doc: FirebaseFirestore.DocumentSnapshot) => this.mapToEntity(doc));

    let hasMore = false;
    let nextCursor = undefined;

    if (data.length === limit) {
      hasMore = true;
      nextCursor = data[data.length - 1].id;
    }

    // Get total count for the tenant
    const countSnapshot = await db.collection(this.collectionName).where('tenantId', '==', tenantId).count().get();
    const total = countSnapshot.data().count;

    return {
      data,
      total,
      hasMore,
      nextCursor
    };
  }

  async update(id: string, data: Partial<QuoteEntity>): Promise<QuoteEntity> {
    const docRef = db.collection(this.collectionName).doc(id);
    
    // Create a copy and ensure we don't accidentally overwrite the ID
    const updateData = { ...data } as any;
    delete updateData.id; 
    updateData.updatedAt = new Date();

    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    
    return this.mapToEntity(updatedDoc);
  }

  async delete(id: string): Promise<void> {
    await db.collection(this.collectionName).doc(id).delete();
  }

  async findByStatus(tenantId: string, status: QuoteStatus): Promise<QuoteEntity[]> {
    const snapshot = await db.collection(this.collectionName)
      .where('tenantId', '==', tenantId)
      .where('status', '==', status)
      .orderBy('createdAt', 'desc')
      .get();
      
    // FIX: Added explicit type to 'doc'
    return snapshot.docs.map((doc: FirebaseFirestore.DocumentSnapshot) => this.mapToEntity(doc));
  }

  async findByCustomerPhone(tenantId: string, phone: string): Promise<QuoteEntity[]> {
    const snapshot = await db.collection(this.collectionName)
      .where('tenantId', '==', tenantId)
      .where('customerPhone', '==', phone)
      .orderBy('createdAt', 'desc')
      .get();
      
    // FIX: Added explicit type to 'doc'
    return snapshot.docs.map((doc: FirebaseFirestore.DocumentSnapshot) => this.mapToEntity(doc));
  }

  async assignTechnician(quoteId: string, technicianId: string): Promise<QuoteEntity> {
    const docRef = db.collection(this.collectionName).doc(quoteId);
    
    await docRef.update({
      assignedTechnicianId: technicianId,
      updatedAt: new Date()
    });

    const updatedDoc = await docRef.get();
    return this.mapToEntity(updatedDoc);
  }
}