import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const catalogData = req.body;

        // Write to public/data/catalog.json
        // Note: On Vercel, this will only work during build time
        // For runtime updates, you need a database (Vercel KV, PostgreSQL, etc.)
        const catalogPath = path.join(process.cwd(), 'public', 'data', 'catalog.json');

        // Ensure directory exists
        const dataDir = path.dirname(catalogPath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Write catalog file
        fs.writeFileSync(catalogPath, JSON.stringify(catalogData, null, 2));

        return res.status(200).json({
            success: true,
            message: 'Catalog saved successfully'
        });
    } catch (error) {
        console.error('Save catalog error:', error);
        return res.status(500).json({ error: error.message });
    }
}
