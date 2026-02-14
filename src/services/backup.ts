
import { initDB } from './db';
import { saveAs } from 'file-saver';

interface BackupData {
    clients: any[];
    documents: any[];
    hashes: any[];
    saved_variables?: any[];
    timestamp: number;
    version: string;
}

export const backupService = {
    async exportData() {
        try {
            const db = await initDB();
            const clients = await db.getAll('clients');
            const documents = await db.getAll('documents');
            const hashes = await db.getAll('external_hashes');
            const saved_variables = await db.getAll('saved_variables');

            const backup: BackupData = {
                clients,
                documents,
                hashes,
                saved_variables,
                timestamp: Date.now(),
                version: '1.0'
            };

            const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            const filename = `nfra_backup_${new Date().toISOString().split('T')[0]}.json`;
            saveAs(blob, filename);
            return true;
        } catch (error) {
            console.error('Export failed:', error);
            throw error;
        }
    },

    async importData(file: File): Promise<{ success: boolean; message: string }> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const json = e.target?.result as string;
                    const data: BackupData = JSON.parse(json);

                    if (!data.clients || !data.documents) {
                        resolve({ success: false, message: 'Invalid backup file format' });
                        return;
                    }

                    const db = await initDB();
                    const tx = db.transaction(['clients', 'documents', 'external_hashes', 'saved_variables'], 'readwrite');

                    // Restore Clients
                    for (const client of data.clients) {
                        await tx.objectStore('clients').put(client);
                    }

                    // Restore Documents
                    for (const doc of data.documents) {
                        await tx.objectStore('documents').put(doc);
                    }

                    // Restore Hashes
                    if (data.hashes) {
                        for (const hash of data.hashes) {
                            await tx.objectStore('external_hashes').put(hash);
                        }
                    }

                    // Restore Saved Variables
                    if (data.saved_variables) {
                        for (const v of data.saved_variables) {
                            await tx.objectStore('saved_variables').put(v);
                        }
                    }

                    await tx.done;
                    resolve({ success: true, message: 'Data restored successfully' });
                } catch (error) {
                    console.error('Import failed:', error);
                    resolve({ success: false, message: 'Failed to parse or restore data' });
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }
};
