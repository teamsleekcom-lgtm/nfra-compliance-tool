import React from 'react';
import styles from '../styles/AppLayout.module.css';

interface AppLayoutProps {
    leftColumn?: React.ReactNode;
    centerColumn?: React.ReactNode;
    rightColumn?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ leftColumn, centerColumn, rightColumn }) => {
    return (
        <div className={styles.container}>
            <aside className={styles.columnOne}>
                <div className={styles.header}>Clients</div>
                <div className={styles.content}>
                    {leftColumn || <div style={{ padding: '20px', color: '#64748b' }}>Client List Component</div>}
                </div>
            </aside>
            <main className={styles.columnTwo}>
                 <div className={styles.header}>Compliance Checklist</div>
                 <div className={styles.content}>
                    {centerColumn || <div style={{ padding: '20px', color: '#64748b' }}>Checklist Component</div>}
                 </div>
            </main>
            <section className={styles.columnThree}>
                 <div className={styles.header}>ASM Editor</div>
                 <div className={styles.content}>
                    {rightColumn || <div style={{ padding: '20px', color: '#64748b' }}>Editor Component</div>}
                 </div>
            </section>
        </div>
    );
};
