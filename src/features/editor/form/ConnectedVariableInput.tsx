import React, { useState, useRef, useEffect } from 'react';

interface ConnectedVariableInputProps {
    id: string;
    variableId: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

export const ConnectedVariableInput: React.FC<ConnectedVariableInputProps> = ({ variableId, placeholder, value, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-resize input to fit content or placeholder
    useEffect(() => {
        if (inputRef.current) {
            const displayText = value || placeholder || variableId || 'Enter value';
            inputRef.current.style.width = Math.max(12, displayText.length + 2) + 'ch';
        }
    }, [value, placeholder, variableId]);

    return (
        <span className="connected-var-wrapper" style={{ display: 'inline-block', margin: '0 2px', position: 'relative', verticalAlign: 'baseline' }}>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || variableId}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                    borderBottom: '2px solid #084A73',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    backgroundColor: 'rgba(8, 74, 115, 0.05)',
                    color: '#084A73',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '2px',
                    minWidth: '80px',
                    maxWidth: '100%',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                }}
            />
            {isFocused && (
                <span style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: 0,
                    fontSize: '10px',
                    backgroundColor: '#084A73',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    marginBottom: '2px',
                    zIndex: 10
                }}>
                    🔗 Updates all "{variableId}"
                </span>
            )}
        </span>
    );
};
