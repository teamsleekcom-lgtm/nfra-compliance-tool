import checklistContent from './checklist_content.json';

export interface ChecklistItem {
    id: string;
    label: string;
    completed: boolean;
    templateText?: string; // Content to insert into editor
}

export interface ChecklistSection {
    id: string;
    title: string;
    items: ChecklistItem[];
}

// Generate items from the JSON content
const generatedItems: ChecklistItem[] = Object.entries(checklistContent).map(([filename, content]) => {
    // Clean up filename for display label
    // Remove extension and replace underscores with spaces
    const label = filename.replace(/\.docx$/i, '').replace(/_/g, ' ');

    // Create a stable ID based on the filename
    // e.g., "01. Scope & ASM.docx" -> "doc-01-scope-asm"
    const stableId = 'doc-' + filename
        .toLowerCase()
        .replace(/\.docx$/i, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    return {
        id: stableId,
        label: label,
        completed: false, // Default to unchecked
        templateText: content as string
    };
});


// Add Document Hashing as the last item
generatedItems.push({
    id: 'doc-hashing-tool',
    label: '99. Document Hashing & Security',
    completed: false,
    templateText: '' // Special case: No template, renders Verifier tool
});

export const INITIAL_CHECKLIST: ChecklistSection[] = [
    {
        id: 'documents',
        title: 'Engagement Documents',
        items: generatedItems
    }
];
