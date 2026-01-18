import { v2 as cloudinary } from 'cloudinary';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            console.warn('Cloudinary not configured');
            return res.status(500).json({ error: 'Cloudinary not configured' });
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        // Generate URL for the raw file
        const url = cloudinary.url('ayush-enterprise/data/catalog.json', {
            resource_type: 'raw',
            secure: true
        });

        // Fetch the data
        const response = await fetch(url);

        if (!response.ok) {
            // If file doesn't exist yet (404), return empty array or default
            if (response.status === 404) {
                return res.status(200).json([]);
            }
            throw new Error(`Failed to fetch from Cloudinary: ${response.statusText}`);
        }

        const data = await response.json();

        // Cache control - cache for 60 seconds
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

        return res.status(200).json(data);
    } catch (error) {
        console.error('Fetch catalog error:', error);
        return res.status(500).json({ error: error.message });
    }
}
