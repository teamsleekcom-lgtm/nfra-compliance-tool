import React, { useRef, useEffect, useCallback } from 'react';
import styles from './Tooltip.module.css';

interface UniqueEntryInputProps {
    id: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export const UniqueEntryInput: React.FC<UniqueEntryInputProps> = ({ placeholder, value, onChange }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea height to fit content
    const autoResize = useCallback(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto'; // Reset first
        el.style.height = el.scrollHeight + 'px';
    }, []);

    useEffect(() => {
        autoResize();
    }, [value, placeholder, autoResize]);

    // Also resize after first paint (placeholder may affect height)
    useEffect(() => {
        const timer = setTimeout(autoResize, 0);
        return () => clearTimeout(timer);
    }, [autoResize]);

    return (
        <span className="unique-entry-wrapper" style={{ display: 'inline', verticalAlign: 'baseline' }}>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => { onChange(e.target.value); autoResize(); }}
                placeholder={placeholder || 'Enter value'}
                rows={1}
                style={{
                    border: '1px dashed #7A4E00',
                    backgroundColor: 'rgba(122, 78, 0, 0.05)',
                    color: '#7A4E00',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontStyle: 'italic',
                    lineHeight: 'inherit',
                    resize: 'none',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '100%',
                    minWidth: '80px',
                    boxSizing: 'border-box',
                    verticalAlign: 'baseline',
                    display: 'inline-block',
                    fieldSizing: 'content' as any, // Modern CSS - auto-sizes if supported
                }}
            />
            <div className={styles.tooltipContainer}>
                <span className={`${styles.icon} ${styles.iconBrown}`}>?</span>
                <div className={styles.tooltipText}>
                    <span className={`${styles.title} ${styles.titleBrown}`}>Unique Entry</span>
                    Information specific to this engagement. You'll type this each time.
                </div>
            </div>
        </span>
    );
};
