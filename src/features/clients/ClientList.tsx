import React from 'react';
import styles from './Clients.module.css';
import type { Client } from '../../types';

interface ClientListProps {
    clients: Client[];
    selectedClientId: string | null;
    onSelectClient: (client: Client) => void;
}

export const ClientList: React.FC<ClientListProps> = ({ clients, selectedClientId, onSelectClient }) => {
    return (
        <div className={styles.listContainer}>
            {clients.length === 0 ? (
                <div style={{ padding: '1rem', color: '#64748b', textAlign: 'center' }}>
                    No clients found for this year.
                </div>
            ) : (
                clients.map(client => (
                    <div
                        key={client.id}
                        className={`${styles.clientItem} ${client.id === selectedClientId ? styles.clientItemActive : ''}`}
                        onClick={() => onSelectClient(client)}
                    >
                        <div className={styles.clientHeader}>
                            <span className={styles.clientName}>{client.name}</span>
                            {client.nfraBadge && <span className={styles.nfraBadge}>NFRA</span>}
                        </div>
                        <div className={styles.subText}>PAN: {client.pan}</div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${client.completionPercentage}%` }}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
