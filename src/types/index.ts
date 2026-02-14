export interface Client {
    id: string;
    name: string;
    pan: string;
    financialYear: string;
    status: 'pending' | 'in-progress' | 'completed';
    nfraBadge: boolean;
    completionPercentage: number;
}

export interface Document {
    id: string;
    clientId: string;
    title: string;
    content: string; // HTML/JSON from Tiptap (Keep for backward compatibility or static HTML)
    formData?: Record<string, any>; // [NEW] JSON storage for Form Data
    lastModified: number;
    hash?: string;
    version: number;
    checklistId?: string; // Links document to a specific checklist item
}

export type FinancialYear = '2023-24' | '2024-25' | '2025-26';

export const FINANCIAL_YEARS: FinancialYear[] = ['2023-24', '2024-25', '2025-26'];
