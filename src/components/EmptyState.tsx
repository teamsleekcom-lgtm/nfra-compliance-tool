import React from 'react';
import { FiPlus } from 'react-icons/fi';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
    onAddClientClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddClientClick }) => {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>📋</div>
            <h2 className={styles.title}>No Clients Yet</h2>
            <p className={styles.description}>
                Ready to create your first NFRA-ready ASM?
                <br /><br />
                Click <b>"+ New Client"</b> to get started.
                <br /><br />
                It takes just 2 minutes to set up, then you'll have a professional ASM template ready to fill.
            </p>
            <div className={styles.buttonContainer}>
                <button className={styles.ctaButton} onClick={onAddClientClick}>
                    <FiPlus /> New Client
                </button>
            </div>
        </div>
    );
};
