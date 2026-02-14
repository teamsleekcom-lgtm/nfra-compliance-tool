import React from 'react';
import { UniqueEntryInput } from './UniqueEntryInput';
import { ConnectedVariableInput } from './ConnectedVariableInput';
import { SavedVariableDropdown } from './SavedVariableDropdown';

interface FormRendererProps {
    htmlContent: string;
    formData: Record<string, any>;
    onInputChange: (id: string, value: string) => void;
    onConnectedChange: (variableId: string, value: string) => void;
}

export const FormRenderer: React.FC<FormRendererProps> = ({ htmlContent, formData, onInputChange, onConnectedChange }) => {

    // Recursive function to convert DOM nodes to React elements
    const renderNode = (node: Node, index: number): React.ReactNode => {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const tagName = element.tagName.toLowerCase();
            const key = `${tagName}-${index}`;

            // Check if it's a variable span
            if (tagName === 'span') {
                const formId = element.getAttribute('data-form-id');

                if (element.classList.contains('unique-entry') && formId) {
                    return (
                        <UniqueEntryInput
                            key={key}
                            id={formId}
                            placeholder={element.textContent || ''}
                            value={formData[formId] || ''}
                            onChange={(val) => onInputChange(formId, val)}
                        />
                    );
                }

                if (element.classList.contains('connected-var') && formId) {
                    const variableId = element.getAttribute('data-variable-id') || 'unknown';
                    // For connected vars, value comes from formData via variableId usually, 
                    // but here we used unique formId for the specific input.
                    // However, they should share value.
                    // Implementation detail: formData should track values by variableId OR we sync them.
                    // User requested: "Updates all instances".
                    // So we probably want to look up value by variableId if possible, or keep using formId but sync updates.
                    // Let's use formId for state but assume parent handles syncing (which updates all formIds with same varId).

                    return (
                        <ConnectedVariableInput
                            key={key}
                            id={formId}
                            variableId={variableId}
                            placeholder={element.textContent || ''}
                            value={formData[formId] || ''}
                            onChange={(val) => onConnectedChange(variableId, val)}
                        />
                    );
                }

                if (element.classList.contains('saved-var') && formId) {
                    const variableName = element.getAttribute('data-variable-name') || 'unknown';
                    return (
                        <SavedVariableDropdown
                            key={key}
                            id={formId}
                            variableName={variableName}
                            placeholder={element.textContent || ''}
                            value={formData[formId] || ''}
                            onChange={(val) => onInputChange(formId, val)}
                        />
                    );
                }
            }

            // Normal Element - Recursively render children
            const children = Array.from(node.childNodes).map((child, i) => renderNode(child, i));

            // Reconstruct element with attributes (style, class, etc.)
            const props: any = { key };
            Array.from(element.attributes).forEach(attr => {
                if (attr.name === 'class') props.className = attr.value;
                else if (attr.name === 'style') props.style = parseStyleString(attr.value); // React needs object for style
                else if (attr.name !== 'contenteditable') props[attr.name] = attr.value;
            });

            // Void elements cannot have children in React
            const VOID_ELEMENTS = new Set([
                'area', 'base', 'br', 'col', 'embed', 'hr', 'img',
                'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'
            ]);

            if (VOID_ELEMENTS.has(tagName)) {
                return React.createElement(tagName, props);
            }

            return React.createElement(tagName, props, children);
        }
        return null;
    };

    // Helper to parse style string to object
    const parseStyleString = (styleString: string) => {
        const style: Record<string, string> = {};
        styleString.split(';').forEach(rule => {
            const [key, value] = rule.split(':');
            if (key && value) {
                const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                style[camelKey] = value.trim();
            }
        });
        return style;
    };

    // Parse the HTML string once (or on change)
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    return (
        <div className="form-renderer-content">
            {Array.from(doc.body.childNodes).map((node, i) => renderNode(node, i))}
        </div>
    );
};
