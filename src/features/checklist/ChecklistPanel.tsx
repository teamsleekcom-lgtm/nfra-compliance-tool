import React from 'react';
import styles from './Checklist.module.css';
import { Checklist } from './Checklist';


import type { ChecklistItem } from './data';

interface ChecklistPanelProps {
    onSelectItem: (item: ChecklistItem) => void;
    selectedItemId?: string | null;
}

export const ChecklistPanel: React.FC<ChecklistPanelProps> = ({ onSelectItem, selectedItemId }) => {
    return (
        <div className={styles.container}>
            <Checklist onSelectItem={onSelectItem} selectedItemId={selectedItemId} />
        </div>
    );
};
