import { useState, useCallback } from 'react';
import { documentService } from '../services/db';
import type { Document } from '../types';

export const useDocument = () => {
    const [document, setDocument] = useState<Document | null>(null);
    const [loading, setLoading] = useState(false);

    const loadDocument = useCallback(async (clientId: string, checklistId: string, templateContent: string = '') => {
        setLoading(true);
        try {
            // Try to find existing document for this client and checklist item
            const existingDoc = await documentService.getDocument(clientId, checklistId);

            if (existingDoc) {
                setDocument(existingDoc);
            } else {
                // Create new document from template (Draft)
                const newDoc = await documentService.createDocument(
                    clientId,
                    'Draft Document',
                    templateContent,
                    checklistId
                );
                setDocument(newDoc);
            }
        } catch (error) {
            console.error("Error loading document", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const saveDocument = async (doc: Partial<Document>) => {
        if (!document) return;
        const updatedDoc = { ...document, ...doc, lastModified: Date.now() };
        await documentService.saveDocument(updatedDoc as Document);
        setDocument(updatedDoc as Document);
    };

    // improved reset
    const clearDocument = () => setDocument(null);

    const deleteDocument = async () => {
        if (document) {
            await documentService.deleteDocument(document.id);
            setDocument(null);
        }
    };

    return { document, loading, loadDocument, saveDocument, clearDocument, deleteDocument };
};
