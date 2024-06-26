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

  async createSubcollection(chatId: string) {
    // Ensure the parent document exists
    await this.firestore.collection('chats').doc(chatId).set({}, { merge: true });
    await this.firestore.collection('chats').doc(chatId).collection('messages').add({});

    return 'Subcollection created under chatId: ' + chatId;
  }

  async addChatIdToUsers(chatId: string, userAId: string, userBId: string) {
    // log parameters
    console.log('chatId: ', chatId);
    console.log('userAId: ', userAId);
    console.log('userBId: ', userBId);
    
    
    // Validate user IDs
    if (!userAId || !userBId) {
      throw new Error('Invalid user IDs provided.');
    }

    const userADocRef = this.firestore.collection('users').doc(userAId);
    const userBDocRef = this.firestore.collection('users').doc(userBId);

    await this.firestore.runTransaction(async (transaction) => {
      // Check if documents exist, if not, initialize with empty chats array
      const userADoc = await transaction.get(userADocRef);
      const userBDoc = await transaction.get(userBDocRef);

      const userAData = userADoc.exists ? userADoc.data() : { chats: [] };
      const userBData = userBDoc.exists ? userBDoc.data() : { chats: [] };

      const userAChats = userAData.chats;
      const userBChats = userBData.chats;

      // Add chat ID if not already present
      if (!userAChats.includes(chatId)) {
        userAChats.push(chatId);
      }
      if (!userBChats.includes(chatId)) {
        userBChats.push(chatId);
      }

      // Update the documents
      transaction.set(userADocRef, { chats: userAChats }, { merge: true });
      transaction.set(userBDocRef, { chats: userBChats }, { merge: true });
    });

    return `Chat ID: ${chatId} added to users ${userAId} and ${userBId}`;
  }
}
