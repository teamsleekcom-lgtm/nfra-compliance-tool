import React, { useState } from 'react';
import styles from './Checklist.module.css';
import { INITIAL_CHECKLIST } from './data';
import type { ChecklistSection, ChecklistItem } from './data';
import { FaCheck } from "react-icons/fa6";

interface ChecklistProps {
    onSelectItem: (item: ChecklistItem) => void;
    selectedItemId?: string | null;
}

export const Checklist: React.FC<ChecklistProps> = ({ onSelectItem, selectedItemId }) => {
    // Local state for now
    const [checklist, setChecklist] = useState<ChecklistSection[]>(INITIAL_CHECKLIST);

    const toggleItem = (sectionId: string, itemId: string) => {
        setChecklist(prev => prev.map(section => {
            if (section.id !== sectionId) return section;
            return {
                ...section,
                items: section.items.map(item => {
                    if (item.id !== itemId) return item;
                    return { ...item, completed: !item.completed };
                })
            };
        }));
    };

    const handleItemClick = (_sectionId: string, item: ChecklistItem) => {
        // Toggle completion
        // toggleItem(sectionId, item.id); // Option: Do we want to toggle on click or just open? User said "place tick button to right", maybe click on tick toggles, click on text opens? 
        // User: "on clicking compliance checklist items the draft word text should open"
        // User: "place the tick button to right side"
        // Let's make the whole item open the doc, and the tick button toggle status.
        onSelectItem(item);
    };

    const handleCheckboxClick = (e: React.MouseEvent, sectionId: string, itemId: string) => {
        e.stopPropagation();
        toggleItem(sectionId, itemId);
    }

    return (
        <div className={styles.checklistContainer}>
            {checklist.map(section => (
                <div key={section.id} className={styles.section}>
                    <div className={styles.sectionContent} style={{ display: 'block', padding: '0' }}>
                        {section.items.map(item => (
                            <div
                                key={item.id}
                                className={styles.item}
                                onClick={() => handleItemClick(section.id, item)}
                                style={{
                                    backgroundColor: selectedItemId === item.id ? '#f1f5f9' : undefined,
                                    borderLeft: selectedItemId === item.id ? '4px solid #0284c7' : '4px solid transparent'
                                }}
                            >
                                <span style={{ flex: 1, fontWeight: selectedItemId === item.id ? 600 : 400 }}>{item.label}</span>

                                <div
                                    className={`${styles.checkbox} ${item.completed ? styles.checkboxChecked : ''}`}
                                    onClick={(e) => handleCheckboxClick(e, section.id, item.id)}
                                >
                                    {item.completed && <FaCheck size={12} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
