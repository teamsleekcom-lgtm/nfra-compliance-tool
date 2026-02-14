import React, { useState, useEffect } from 'react';
import { variableService } from '../../../services/db';

interface SavedVariableDropdownProps {
    id: string;
    variableName: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

export const SavedVariableDropdown: React.FC<SavedVariableDropdownProps> = ({ variableName, placeholder, value, onChange }) => {
    const [suggestions, setSuggestions] = useState<{ value: string; frequency: number }[]>([]);
    const [isCustom, setIsCustom] = useState(false);
    const [customValue, setCustomValue] = useState('');

    useEffect(() => {
        variableService.getSuggestions(variableName).then(setSuggestions);
    }, [variableName]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val === '__custom__') {
            setIsCustom(true);
        } else {
            onChange(val);
        }
    };

    const handleCustomSave = async () => {
        if (customValue.trim()) {
            onChange(customValue);
            await variableService.saveVariableUsage(variableName, customValue);
            const newSuggestions = await variableService.getSuggestions(variableName);
            setSuggestions(newSuggestions);
            setIsCustom(false);
            setCustomValue('');
        }
    };

    // Determine display label for the dropdown
    const displayName = placeholder || variableName.replace(/_/g, ' ');

    if (isCustom) {
        return (
            <span className="saved-var-custom" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', margin: '0 2px', verticalAlign: 'baseline' }}>
                <input
                    type="text"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    placeholder={`Enter: ${displayName}`}
                    autoFocus
                    style={{
                        border: '1px solid #00B050',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        minWidth: '160px',
                        fontSize: 'inherit',
                        fontFamily: 'inherit',
                        color: '#00B050'
                    }}
                />
                <button onClick={handleCustomSave} style={{ fontSize: '10px', padding: '2px 6px', background: '#00B050', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer' }}>OK</button>
                <button onClick={() => setIsCustom(false)} style={{ fontSize: '10px', padding: '2px 6px', background: '#ccc', border: 'none', borderRadius: '2px', cursor: 'pointer' }}>✕</button>
            </span>
        );
    }

    return (
        <span className="saved-var-wrapper" style={{ display: 'inline-block', margin: '0 2px', verticalAlign: 'baseline' }}>
            <select
                value={value}
                onChange={handleChange}
                style={{
                    border: '1px solid #00B050',
                    backgroundColor: 'rgba(0, 176, 80, 0.05)',
                    color: '#00B050',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    minWidth: '120px',
                    maxWidth: '100%'
                }}
            >
                <option value="" disabled>▾ {displayName}</option>
                {suggestions.map((s, idx) => (
                    <option key={idx} value={s.value}>{s.value}</option>
                ))}
                <option value="__custom__" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>+ Add New...</option>
            </select>
        </span>
    );
};
