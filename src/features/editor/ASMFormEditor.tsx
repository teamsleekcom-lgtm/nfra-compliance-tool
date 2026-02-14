import React, { useState, useEffect } from 'react';
import { FormRenderer } from './form/FormRenderer';
import { extractVariablesFromHtml } from '../../utils/formParser';
import { exportToWord } from '../../services/export';
import styles from './Editor.module.css';

interface ASMFormEditorProps {
    initialContent?: string;
    onSave?: (formData: Record<string, any>) => void;
    savedFormData?: Record<string, any>;
}

export const ASMFormEditor: React.FC<ASMFormEditorProps> = ({ initialContent, onSave, savedFormData }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [processedHtml, setProcessedHtml] = useState<string>('');
    const [variables, setVariables] = useState<any[]>([]);

    useEffect(() => {
        if (initialContent) {
            const { variables: extractedVars, processedHtml: html } = extractVariablesFromHtml(initialContent);
            setVariables(extractedVars);
            setProcessedHtml(html);

            // Initialize form data with saved data or defaults
            const initialData = { ...savedFormData };

            // Populate connected vars if they have default values in the doc but not in saved data
            extractedVars.forEach(v => {
                if (v.type === 'connected_var' && !initialData[v.id] && v.defaultValue) {
                    // logic to set default?
                    // Actually, if it's connected, we might want to check if ANY instance has a value?
                }
            });

            setFormData(initialData);
        }
    }, [initialContent, savedFormData]);

    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
    const saveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        };
    }, []);

    const debouncedSave = (data: Record<string, any>) => {
        setSaveStatus('saving');
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        saveTimeoutRef.current = setTimeout(() => {
            onSave?.(data);
            setSaveStatus('saved');
        }, 30000); // 30 second debounce
    };

    const handleInputChange = (id: string, value: string) => {
        const newData = { ...formData, [id]: value };
        setFormData(newData);
        debouncedSave(newData);
    };

    const handleConnectedChange = (variableId: string, value: string) => {
        // Find all form fields that are mapped to this variableId
        const newData = { ...formData };

        variables.forEach((v: any) => {
            if (v.type === 'connected_var' && v.variableId === variableId) {
                newData[v.id] = value;
            }
        });

        setFormData(newData);
        debouncedSave(newData);
    };

    const handleExport = () => {
        // Filename: ClientName_Section_ASM.docx
        // We'd need client name passed in props ideally, or just generic for now.
        const filename = `ASM_Document`;
        exportToWord(processedHtml, formData, filename);
    };

    return (
        <div className={styles.editorContainer}>
            <div className={styles.headerBar}>
                <strong>ASM Form Editor</strong>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span className={styles.saveStatus}>
                        {saveStatus === 'saving' ? 'Saving...' : 'All changes saved'}
                    </span>
                    <button
                        onClick={handleExport}
                        style={{
                            padding: '4px 12px',
                            backgroundColor: '#00B050',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: 600
                        }}
                    >
                        Export to Word
                    </button>
                </div>
            </div>
            <div className={styles.editorContent}>
                <FormRenderer
                    htmlContent={processedHtml}
                    formData={formData}
                    onInputChange={handleInputChange}
                    onConnectedChange={handleConnectedChange}
                />
            </div>
        </div>
    );
};
