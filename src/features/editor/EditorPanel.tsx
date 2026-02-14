import React, { useEffect } from 'react';
import { useDocument } from '../../hooks/useDocument';
import { ASMFormEditor } from './ASMFormEditor';
import styles from './Editor.module.css';
import { documentService } from '../../services/db';
import type { ChecklistItem } from '../checklist/data';
import { DocumentVerifier } from '../../features/premium/DocumentVerifier';

interface EditorPanelProps {
    clientId: string | null;
    checklistItem: ChecklistItem | null;
    insertPayload?: { content: string; id: string } | null;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ clientId, checklistItem }) => {
    const { document, loading, loadDocument, deleteDocument } = useDocument();

    const isHashingTool = checklistItem?.id === 'doc-hashing-tool';

    useEffect(() => {
        if (clientId && checklistItem && !isHashingTool) {
            loadDocument(clientId, checklistItem.id, checklistItem.templateText);
        }
    }, [clientId, checklistItem, loadDocument, isHashingTool]);

    const handleSave = async (data: Record<string, any>) => {
        if (document) {
            await documentService.saveDocument({
                ...document,
                formData: data,
                lastModified: Date.now()
            });
        }
    };

    const handleReset = async () => {
        if (window.confirm("Are you sure you want to reset this document? All changes will be lost and it will revert to the original template.")) {
            // Delete existing doc
            await deleteDocument();
            // Reload (which creates new from template if missing)
            if (clientId && checklistItem) {
                loadDocument(clientId, checklistItem.id, checklistItem.templateText);
            }
        }
    };

    if (!clientId || !checklistItem) {
        return <div className={styles.emptyState}>Select a client and checklist item to get started.</div>;
    }

    if (isHashingTool) {
        return (
            <div className={styles.editorPanel} style={{ overflowY: 'auto', background: '#f8fafc' }}>
                <DocumentVerifier />
            </div>
        );
    }

    if (loading) {
        return <div className={styles.loadingState}>Loading document...</div>;
    }

    return (
        <div className={styles.editorPanel}>
            {document && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 100 }}>
                    <button
                        onClick={handleReset}
                        style={{
                            fontSize: '10px',
                            padding: '2px 6px',
                            color: '#ef4444',
                            background: 'none',
                            border: '1px solid #ef4444',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Reset to Template
                    </button>
                </div>
            )}
            <ASMFormEditor
                key={document?.id || 'loading'} // Force remount on doc change
                initialContent={document?.content}
                savedFormData={document?.formData}
                onSave={handleSave}
            />
        </div>
    );
};
