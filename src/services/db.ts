import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { Client, Document } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface NFRAComplianceDB extends DBSchema {
    clients: {
        key: string;
        value: Client;
        indexes: { 'by-year': string };
    };
    documents: {
        key: string;
        value: Document;
        indexes: { 'by-client': string };
    };
    external_hashes: {
        key: string;
        value: { id: string, name: string, hash: string, timestamp: number };
    };
    saved_variables: {
        key: number;
        value: { id?: number; name: string; value: string; frequency: number; lastUsed: number };
        indexes: { 'by-name': string };
    };
}

const DB_NAME = 'nfra-compliance-db';
const DB_VERSION = 3; // Increment version

let dbPromise: Promise<IDBPDatabase<NFRAComplianceDB>>;

export const initDB = () => {
    if (!dbPromise) {
        dbPromise = openDB<NFRAComplianceDB>(DB_NAME, DB_VERSION, {
            upgrade(db, oldVersion, _newVersion, _transaction) {
                if (oldVersion < 1) {
                    const clientStore = db.createObjectStore('clients', { keyPath: 'id' });
                    clientStore.createIndex('by-year', 'financialYear');

                    const docStore = db.createObjectStore('documents', { keyPath: 'id' });
                    docStore.createIndex('by-client', 'clientId');
                }
                if (oldVersion < 2) {
                    db.createObjectStore('external_hashes', { keyPath: 'id' });
                }
                if (oldVersion < 3) {
                    const varStore = db.createObjectStore('saved_variables', { keyPath: 'id', autoIncrement: true });
                    varStore.createIndex('by-name', 'name');
                }
            },
        });
    }
    return dbPromise;
};

export const clientService = {
    async getAllClients(year?: string) {
        const db = await initDB();
        if (year) {
            return db.getAllFromIndex('clients', 'by-year', year);
        }
        return db.getAll('clients');
    },

    async addClient(client: Omit<Client, 'id'>) {
        const db = await initDB();
        const newClient = { ...client, id: uuidv4() };
        await db.add('clients', newClient);
        return newClient;
    },

    async updateClient(client: Client) {
        const db = await initDB();
        await db.put('clients', client);
    },

    async deleteClient(id: string) {
        const db = await initDB();
        await db.delete('clients', id);
    }
};

export const documentService = {
    async getDocumentsByClient(clientId: string) {
        const db = await initDB();
        return db.getAllFromIndex('documents', 'by-client', clientId);
    },

    async saveDocument(doc: Document) {
        const db = await initDB();
        await db.put('documents', doc);
    },

    async createDocument(clientId: string, title: string, content: string = '', checklistId?: string) {
        const db = await initDB();
        const newDoc: Document = {
            id: uuidv4(),
            clientId,
            title,
            content,
            lastModified: Date.now(),
            version: 1,
            checklistId: checklistId || uuidv4() // Ensure checklistId is present
        };
        await db.add('documents', newDoc);
        return newDoc;
    },
    async getDocument(clientId: string, checklistId: string) {
        const db = await initDB();
        const docs = await db.getAllFromIndex('documents', 'by-client', clientId);
        return docs.find(doc => doc.checklistId === checklistId);
    },

    async deleteDocument(id: string) {
        const db = await initDB();
        await db.delete('documents', id);
    }
};

export interface SavedVariable {
    id?: number;
    name: string; // The variable identifier (e.g., "partner_name")
    value: string; // The value (e.g., "CA. Dharmaraj")
    frequency: number;
    lastUsed: number;
}

export const variableService = {
    async getSuggestions(variableName: string) {
        const db = await initDB();
        const allVars = await db.getAllFromIndex('saved_variables', 'by-name', variableName);
        // Sort by frequency (desc) then lastUsed (desc)
        return allVars.sort((a, b) => {
            if (b.frequency !== a.frequency) return b.frequency - a.frequency;
            return b.lastUsed - a.lastUsed;
        });
    },

    async saveVariableUsage(name: string, value: string) {
        const db = await initDB();
        const tx = db.transaction('saved_variables', 'readwrite');
        const store = tx.objectStore('saved_variables');

        // Check if exists
        const index = store.index('by-name');
        const existingVars = await index.getAll(name);
        const match = existingVars.find(v => v.value === value);

        if (match) {
            match.frequency += 1;
            match.lastUsed = Date.now();
            await store.put(match);
        } else {
            await store.add({
                name,
                value,
                frequency: 1,
                lastUsed: Date.now()
            });
        }
        await tx.done;
    }
};
