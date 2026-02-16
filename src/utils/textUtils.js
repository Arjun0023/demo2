/**
 * Strip markdown formatting from text
 * Removes common markdown syntax like headers, bold, italic, links, etc.
 */
export const stripMarkdown = (text) => {
    if (!text || typeof text !== 'string') {
        return '';
    }

    let stripped = text;

    // Remove code blocks (```code```)
    stripped = stripped.replace(/```[\s\S]*?```/g, '');

    // Remove inline code (`code`)
    stripped = stripped.replace(/`[^`]*`/g, '');

    // Remove images (![alt](url))
    stripped = stripped.replace(/!\[([^\]]*)\]\([^\)]*\)/g, '$1');

    // Remove links ([text](url)) but keep the text
    stripped = stripped.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

    // Remove headers (# ## ### etc.)
    stripped = stripped.replace(/^#{1,6}\s+(.+)$/gm, '$1');

    // Remove bold (**text** or __text__)
    stripped = stripped.replace(/\*\*([^*]+)\*\*/g, '$1');
    stripped = stripped.replace(/__([^_]+)__/g, '$1');

    // Remove italic (*text* or _text_)
    stripped = stripped.replace(/\*([^*]+)\*/g, '$1');
    stripped = stripped.replace(/_([^_]+)_/g, '$1');

    // Remove strikethrough (~~text~~)
    stripped = stripped.replace(/~~([^~]+)~~/g, '$1');

    // Remove blockquotes (> text)
    stripped = stripped.replace(/^>\s+(.+)$/gm, '$1');

    // Remove horizontal rules (--- or ***)
    stripped = stripped.replace(/^[-*]{3,}$/gm, '');

    // Remove list markers (- * + or 1. 2. etc.)
    stripped = stripped.replace(/^[\s]*[-*+]\s+(.+)$/gm, '$1');
    stripped = stripped.replace(/^[\s]*\d+\.\s+(.+)$/gm, '$1');

    // Clean up extra whitespace
    stripped = stripped.replace(/\n{3,}/g, '\n\n');
    stripped = stripped.trim();

    return stripped;
};
