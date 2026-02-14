export type FormComponentType = 'static_text' | 'unique_entry' | 'connected_var' | 'saved_var';


// Revised Strategy:
// We don't need a complex intermediate JSON for the structure if we can just "Hydrate" the HTML.
// But we DO need to know what variables exist to save them.
// So:
// 1. `extractVariables(html)` -> Returns list of variables found (for initial state).
// 2. `FormRenderer` -> Takes HTML, parses it into React Tree, replacing specific spans with Input Components.

export const extractVariablesFromHtml = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const variables: any[] = [];
    let uniqueIdCounter = 0;

    const findVars = (node: Element) => {
        if (node.tagName === 'SPAN') {
            if (node.classList.contains('unique-entry')) {
                variables.push({
                    type: 'unique_entry',
                    id: `unique_${uniqueIdCounter++}`,
                    placeholder: node.textContent,
                });
                node.setAttribute('data-form-id', `unique_${uniqueIdCounter - 1}`);
            } else if (node.classList.contains('connected-var')) {
                const vId = node.getAttribute('data-variable-id');
                variables.push({
                    type: 'connected_var',
                    id: `connected_${vId}`,
                    variableId: vId,
                    defaultValue: node.textContent
                });
                node.setAttribute('data-form-id', `connected_${vId}`);
            } else if (node.classList.contains('saved-var')) {
                const vName = node.getAttribute('data-variable-name');
                variables.push({
                    type: 'saved_var',
                    id: `saved_${vName}_${uniqueIdCounter++}`, // Unique ID for this instance
                    variableName: vName,
                    defaultValue: node.textContent
                });
                node.setAttribute('data-form-id', `saved_${vName}_${uniqueIdCounter - 1}`);
            }
        }
        Array.from(node.children).forEach(findVars);
    };

    findVars(doc.body);

    return {
        variables,
        processedHtml: doc.body.innerHTML // HTML with data-form-id injected for easier finding
    };
};
