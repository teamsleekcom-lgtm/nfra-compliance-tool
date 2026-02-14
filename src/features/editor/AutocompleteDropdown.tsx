import React, { useState, useEffect, useRef } from 'react';
import styles from './Editor.module.css';

interface Suggestion {
    id?: number;
    value: string;
    frequency: number;
}

interface AutocompleteDropdownProps {
    suggestions: Suggestion[];
    onSelect: (value: string) => void;
    position: { top: number; left: number };
    onClose: () => void;
}

export const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({ suggestions, onSelect, position, onClose }) => {
    const [newValue, setNewValue] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (newValue.trim()) {
                onSelect(newValue.trim());
            }
        }
    };

    return (
        <div
            ref={dropdownRef}
            className={styles.autocompleteDropdown}
            style={{ top: position.top, left: position.left }}
        >
            <div className={styles.suggestionsList}>
                {suggestions.map((s, index) => (
                    <div
                        key={index}
                        className={styles.suggestionItem}
                        onClick={() => onSelect(s.value)}
                    >
                        <span className={styles.suggestionValue}>{s.value}</span>
                        <span className={styles.suggestionMeta}>{s.frequency}x</span>
                    </div>
                ))}
            </div>
            <div className={styles.addNewWrapper}>
                <input
                    type="text"
                    placeholder="+ Type new value & Enter"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.addNewInput}
                    autoFocus
                />
            </div>
        </div>
    );
};
