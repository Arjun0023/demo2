import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

// Disable body parsing, we'll handle it with formidable
export const config = {
    api: {
        bodyParser: false,
    },
};

// Initialize Cloudinary
const initializeCloudinary = () => {
    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
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

// Upload to Cloudinary
const uploadToCloudinary = async (fileBuffer, fileName, category) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: `ayush-enterprise/${category}`,
                public_id: fileName.replace(/\.[^/.]+$/, ''),
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );

        uploadStream.end(fileBuffer);
    });
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Parse form data
        const form = formidable({
            maxFileSize: 5 * 1024 * 1024, // 5MB
        });

        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve([fields, files]);
            });
        });

        const file = files.file?.[0];
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Validate file type
        const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
        const isValidType = allowedTypes.test(file.mimetype || '');

        if (!isValidType) {
            return res.status(400).json({ error: 'Invalid file type' });
        }

        // Generate filename
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const extension = file.originalFilename?.split('.').pop() || 'jpg';
        const nameWithoutExt = (file.originalFilename?.replace(/\.[^/.]+$/, '') || 'file')
            .replace(/[^a-z0-9]/gi, '-')
            .toLowerCase();
        const fileName = `${nameWithoutExt}-${timestamp}-${randomStr}.${extension}`;

        // Read file buffer
        const fileBuffer = fs.readFileSync(file.filepath);

        // Get category
        const category = fields.category?.[0] || 'products';

        // Try Cloudinary upload
        const cloudinaryConfigured = initializeCloudinary();

        if (cloudinaryConfigured) {
            try {
                const publicUrl = await uploadToCloudinary(
                    fileBuffer,
                    fileName,
                    category
                );

                return res.status(200).json({
                    success: true,
                    path: publicUrl,
                    filename: fileName,
                });
            } catch (cloudinaryError) {
                console.error('Cloudinary upload failed:', cloudinaryError.message);
                return res.status(500).json({
                    error: 'Cloudinary upload failed: ' + cloudinaryError.message
                });
            }
        } else {
            return res.status(500).json({
                error: 'Cloudinary not configured. Please add environment variables to Vercel.'
            });
        }
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: error.message });
    }
}
