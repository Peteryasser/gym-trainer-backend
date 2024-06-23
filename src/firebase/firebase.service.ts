import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    if (admin.apps.length === 0) {
      const serviceAccount = require('../../fireBaseService2.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    }
  }

  get firestore() {
    return admin.firestore();
  }

  get auth() {
    return admin.auth();
  }

  async createDocumentInTestCollection(data: any) {
    const docRef = this.firestore.collection('testA').doc('5').collection('testB').doc();
    await docRef.set(data);
    return docRef.id;
  }

  async createSubcollection(data: any, chatId: string) {
    // Ensure the parent document exists
    await this.firestore.collection('chats').doc(chatId).set({}, { merge: true });

    // Create an empty document in the subcollection
    const docRef = this.firestore.collection('chats').doc(chatId).collection('messages').doc();
    await docRef.set({});
    return docRef.id;
  }
}
