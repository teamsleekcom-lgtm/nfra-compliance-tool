import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, WidthType, VerticalAlign, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

// Variable colors for reference (from requirements)
const COLORS = {
    UNIQUE: '7A4E00', // Brown
    CONNECTED: '084A73', // Blue
    SAVED: '00B050'   // Green
};

export const exportToWord = async (htmlContent: string, formData: Record<string, any>, fileName: string) => {
    // 1. Parse HTML to identify structure
    // Since we don't have a robust HTML->Docx parser in browser without heavy libs,
    // We will do a best-effort conversion focused on our known structure (Paragraphs + Spans).

    // We use the DOMParser to walk the tree similarly to how we render the form.
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const children: (Paragraph | Table)[] = [];

    // Process nodes
    Array.from(doc.body.children).forEach(node => {
        const docxNode = processNodeToDocx(node, formData);
        if (docxNode) {
            if (Array.isArray(docxNode)) {
                children.push(...docxNode);
            } else {
                children.push(docxNode);
            }
        }
    });

    // 2. Create Document
    const docx = new Document({
        sections: [{
            properties: {},
            children: children
        }]
    });

    // 3. Generate Blob
    const blob = await Packer.toBlob(docx);

    // 4. Save
    saveAs(blob, fileName.endsWith('.docx') ? fileName : `${fileName}.docx`);
};

const processNodeToDocx = (node: Element, formData: Record<string, any>): (Paragraph | Table) | (Paragraph | Table)[] | null => {
    const tagName = node.tagName.toLowerCase();

    if (tagName === 'p' || tagName.startsWith('h')) {
        const runs: TextRun[] = [];

        // Process children (text and spans)
        Array.from(node.childNodes).forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                if (child.textContent) {
                    runs.push(new TextRun({
                        text: child.textContent,
                        size: 24 // 12pt
                    }));
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                const el = child as Element;
                if (el.tagName === 'SPAN') {
                    // Check if variable
                    const formId = el.getAttribute('data-form-id');
                    let text = el.textContent || '';
                    let color = '000000';
                    let bold = false;

                    if (formId && formData[formId]) {
                        text = formData[formId]; // Use filled value
                    } else if (el.classList.contains('connected-var')) {
                        // Try to find value by variableId if formId value missing
                        // We'd need to lookup variableId in formData keys... 
                        // But for now, if not in formData by formId, use default.
                    }

                    if (el.classList.contains('unique-entry')) {
                        color = COLORS.UNIQUE;
                        // highlight = "yellow"; // Optional visual style matching Word
                    } else if (el.classList.contains('connected-var')) {
                        color = COLORS.CONNECTED;
                        bold = true;
                    } else if (el.classList.contains('saved-var')) {
                        color = COLORS.SAVED;
                    }

                    // Handle styles from style attribute (e.g. bold from original)
                    // ...

                    runs.push(new TextRun({
                        text: text,
                        color: color,
                        bold: bold,
                        size: 24,
                    }));
                } else if (el.tagName === 'STRONG' || el.tagName === 'B') {
                    runs.push(new TextRun({
                        text: el.textContent || '',
                        bold: true,
                        size: 24,
                    }));
                } else {
                    // Fallback for other tags
                    runs.push(new TextRun({
                        text: el.textContent || '',
                        size: 24,
                    }));
                }
            }
        });

        let headingLevel = undefined;
        if (tagName === 'h1') headingLevel = HeadingLevel.HEADING_1;
        if (tagName === 'h2') headingLevel = HeadingLevel.HEADING_2;
        if (tagName === 'h3') headingLevel = HeadingLevel.HEADING_3;

        // Check alignment
        let alignment: any = AlignmentType.LEFT;
        if ((node as HTMLElement).style.textAlign === 'center') alignment = AlignmentType.CENTER;
        if ((node as HTMLElement).style.textAlign === 'right') alignment = AlignmentType.RIGHT;

        return new Paragraph({
            children: runs,
            heading: headingLevel,
            alignment: alignment,
            spacing: { after: 200 } // Add some spacing
        });
    }

    if (tagName === 'table') {
        const rows = Array.from(node.querySelectorAll('tr')).map(tr => {
            const cells = Array.from(tr.querySelectorAll('td, th')).map(td => {
                // Recursive process cell content?
                // Cells usually contain paragraphs.
                const cellChildren = [];
                Array.from(td.children).forEach(child => {
                    const p = processNodeToDocx(child, formData);
                    if (p && !Array.isArray(p)) cellChildren.push(p);
                    else if (Array.isArray(p)) cellChildren.push(...p);
                    else {
                        // Text content if no P?
                        if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
                            cellChildren.push(new Paragraph({
                                children: [new TextRun(child.textContent)]
                            }));
                        }
                    }
                });

                // If empty/text only directly in TD?
                if (cellChildren.length === 0 && td.textContent) {
                    cellChildren.push(new Paragraph({
                        children: [new TextRun(td.textContent)]
                    }));
                }

                return new TableCell({
                    children: cellChildren,
                    verticalAlign: VerticalAlign.CENTER,
                    borders: {
                        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    }
                });
            });
            return new TableRow({
                children: cells
            });
        });

        return new Table({
            rows: rows,
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            }
        });
    }

    // Fallback for lists?
    if (tagName === 'ul' || tagName === 'ol') {
        const listItems = Array.from(node.children).map(li => {
            // Treat LI as P with bullet/number
            return new Paragraph({
                text: li.textContent || '',
                bullet: {
                    level: 0
                }
            });
        });
        return listItems;
    }

    return null;
};
