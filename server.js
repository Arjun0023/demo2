import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Cloudinary Setup
let cloudinaryConfigured = false;

const initializeCloudinary = () => {
    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.warn('⚠️  Cloudinary credentials not found. Using local file storage.');
            return false;
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        cloudinaryConfigured = true;
        console.log('✅ Cloudinary initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize Cloudinary:', error.message);
        return false;
    }
};

// Initialize Cloudinary on startup
initializeCloudinary();

// Upload file to Cloudinary
const uploadToCloudinary = async (fileBuffer, fileName, category) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: `ayush-enterprise/${category}`,
                public_id: fileName.replace(/\.[^/.]+$/, ''), // Remove extension
                resource_type: 'auto', // Automatically detect image/video
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

// Fallback: Save to local file system
const saveToLocalFileSystem = (fileBuffer, fileName, category) => {
    const uploadDir = path.join(__dirname, 'public', 'assets', 'uploads', category);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, fileBuffer);

    return `/assets/uploads/${category}/${fileName}`;
};

// Configure multer for memory storage
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images and videos are allowed.'));
        }
    }
});

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const category = req.body.category || 'products';
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const extension = path.extname(req.file.originalname);
        const nameWithoutExt = path.basename(req.file.originalname, extension)
            .replace(/[^a-z0-9]/gi, '-')
            .toLowerCase();
        const fileName = `${nameWithoutExt}-${timestamp}-${randomStr}${extension}`;

        let filePath;

        // Try Cloudinary first, fallback to local storage
        if (cloudinaryConfigured) {
            try {
                filePath = await uploadToCloudinary(
                    req.file.buffer,
                    fileName,
                    category
                );
                console.log(`✅ Uploaded to Cloudinary: ${fileName}`);
            } catch (cloudinaryError) {
                console.warn('⚠️  Cloudinary upload failed, using local storage:', cloudinaryError.message);
                filePath = saveToLocalFileSystem(req.file.buffer, fileName, category);
            }
        } else {
            // No Cloudinary configured, use local storage
            filePath = saveToLocalFileSystem(req.file.buffer, fileName, category);
        }

        res.json({
            success: true,
            path: filePath,
            filename: fileName
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Save catalog endpoint
app.post('/api/save-catalog', (req, res) => {
    try {
        const catalogData = req.body;
        const catalogPath = path.join(__dirname, 'public', 'data', 'catalog.json');

        // Ensure directory exists
        const dataDir = path.dirname(catalogPath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Write catalog file
        fs.writeFileSync(catalogPath, JSON.stringify(catalogData, null, 2));

        res.json({
            success: true,
            message: 'Catalog saved successfully'
        });
    } catch (error) {
        console.error('Save catalog error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API server running on http://localhost:${PORT}`);
    if (cloudinaryConfigured) {
        console.log('☁️  Using Cloudinary for file storage');
    } else {
        console.log('💾 Using local file system for storage (development only)');
        console.log('ℹ️  To use Cloudinary, configure .env file with credentials');
    }
});
