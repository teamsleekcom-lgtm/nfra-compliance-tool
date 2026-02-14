import React, { useState, useEffect } from 'react';
import { YearFilter } from './YearFilter';
import { ClientList } from './ClientList';
import type { Client, FinancialYear } from '../../types';
import { backupService } from '../../services/backup';

interface ClientsSidebarProps {
    clients: Client[];
    selectedYear: FinancialYear;
    onYearChange: (year: FinancialYear) => void;
    selectedClientId: string | null;
    onSelectClient: (id: string) => void;
    onAddClient: (client: Omit<Client, 'id'>) => Promise<void>;
}

export const ClientsSidebar: React.FC<ClientsSidebarProps> = ({
    clients,
    selectedYear,
    onYearChange,
    selectedClientId,
    onSelectClient,
    onAddClient
}) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newClientName, setNewClientName] = useState('');
    const [newClientPan, setNewClientPan] = useState('');
    const formRef = React.useRef<HTMLFormElement>(null);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = async (event: MouseEvent) => {
            if (isAdding && formRef.current && !formRef.current.contains(event.target as Node)) {
                // Clicked outside
                // Attempt auto-save if data is present and valid
                if (newClientName && newClientPan) {
                    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                    if (panRegex.test(newClientPan.toUpperCase())) {
                        await onAddClient({
                            name: newClientName,
                            pan: newClientPan.toUpperCase(),
                            financialYear: selectedYear,
                            status: 'pending',
                            nfraBadge: false,
                            completionPercentage: 0
                        });
                        setNewClientName('');
                        setNewClientPan('');
                    }
                }
                // Always close
                setIsAdding(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAdding, newClientName, newClientPan, onAddClient, selectedYear]);

    const handleExportData = async () => {
        try {
            await backupService.exportData();
            alert('Data exported successfully!');
        } catch (err) {
            alert('Export failed. See console for details.');
        }
    };

    const handleImportData = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                if (window.confirm("Importing data will merge with existing data. Be careful not to duplicate. Do you want to proceed?")) {
                    await backupService.importData(file);
                    alert('Data imported successfully! The page will reload.');
                    window.location.reload();
                }
            } catch (err) {
                alert('Import failed.');
            }
        }
    };

    const handleAddClient = async (e: React.FormEvent) => {
        e.preventDefault();

        // Strict PAN Validation: 5 chars, 4 digits, 1 char (e.g. ABCDE1234F)
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(newClientPan.toUpperCase())) {
            alert('Invalid PAN format. It must be 5 letters, 4 digits, and 1 letter (e.g., ABCDE1234F).');
            return;
        }

        if (newClientName && newClientPan) {
            await onAddClient({
                name: newClientName,
                pan: newClientPan.toUpperCase(),
                financialYear: selectedYear,
                status: 'pending',
                nfraBadge: false,
                completionPercentage: 0
            });
            setIsAdding(false);
            setNewClientName('');
            setNewClientPan('');
        }
    };

    return (

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header Controls Row */}
            <div style={{ display: 'flex', padding: '0.25rem 1rem', borderBottom: '1px solid #e2e8f0', gap: '0.5rem', background: 'white' }}>
                <div style={{ flex: 1 }}>
                    <YearFilter selectedYear={selectedYear} onYearChange={onYearChange} />
                </div>
                <div style={{ flex: 1 }}>
                    {!isAdding ? (
                        <button
                            onClick={() => setIsAdding(true)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                background: '#64748b', // Gray as requested
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px', // Match select border radius
                                cursor: 'pointer',
                                fontSize: '0.875rem'
                            }}
                        >
                            + Add Client
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsAdding(false)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                background: '#94a3b8',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.875rem'
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* Add Client Form (Visible only when adding) */}
            {isAdding && (
                <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <form ref={formRef} onSubmit={handleAddClient} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={newClientName}
                            onChange={(e) => setNewClientName(e.target.value)}
                            required
                            style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                        />
                        <input
                            type="text"
                            placeholder="PAN"
                            value={newClientPan}
                            onChange={(e) => setNewClientPan(e.target.value)}
                            required
                            style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                        />
                        <button type="submit" style={{ padding: '0.5rem', background: '#16a34a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Save Client
                        </button>
                    </form>
                </div>
            )}

            <ClientList
                clients={clients}
                selectedClientId={selectedClientId}
                onSelectClient={(client) => onSelectClient(client.id)}
            />

            <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', marginBottom: '0.5rem' }}>DATA MANAGEMENT</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={handleExportData}
                        style={{ flex: 1, padding: '6px', fontSize: '12px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Export Data
                    </button>
                    <label style={{ flex: 1, padding: '6px', fontSize: '12px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}>
                        Import Backup
                        <input type="file" onChange={handleImportData} style={{ display: 'none' }} accept=".json" />
                    </label>
                </div>
            </div>
        </div>
    );
};
