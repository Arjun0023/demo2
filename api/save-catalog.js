import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary
const initializeCloudinary = () => {
    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.warn('Cloudinary credentials missing');
            return false;
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        return true;
    } catch (error) {
        console.error('Failed to initialize Cloudinary:', error.message);
        return false;
    }
};

const uploadToCloudinary = async (data, publicId) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'ayush-enterprise/data',
                public_id: publicId,
                resource_type: 'raw',
                overwrite: true,
                invalidate: true,
                format: 'json'
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );

        uploadStream.end(JSON.stringify(data, null, 2));
    });
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const catalogData = req.body;

        if (initializeCloudinary()) {
            await uploadToCloudinary(catalogData, 'catalog');
            console.log('✅ Catalog saved to Cloudinary');

            return res.status(200).json({
                success: true,
                message: 'Catalog saved to Cloudinary successfully'
            });
        } else {
            console.warn('⚠️ Cloudinary not configured, cannot save persistent data on Vercel.');
            return res.status(500).json({
                error: 'Cloudinary not configured. Data persistence requires Cloudinary credentials.'
            });
        }
    } catch (error) {
        console.error('Save catalog error:', error);
        return res.status(500).json({ error: error.message });
    }
}
