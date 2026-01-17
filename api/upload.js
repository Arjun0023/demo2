import { google } from 'googleapis';
import { Readable } from 'stream';
import formidable from 'formidable';
import fs from 'fs';

// Disable body parsing, we'll handle it with formidable
export const config = {
    api: {
        bodyParser: false,
    },
};

// Initialize Google Drive
const initializeGoogleDrive = () => {
    try {
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            return null;
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        return google.drive({ version: 'v3', auth });
    } catch (error) {
        console.error('Failed to initialize Google Drive:', error.message);
        return null;
    }
};

// Upload to Google Drive
const uploadToGoogleDrive = async (drive, fileBuffer, fileName, mimeType) => {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    const bufferStream = new Readable();
    bufferStream.push(fileBuffer);
    bufferStream.push(null);

    const fileMetadata = {
        name: fileName,
        parents: folderId ? [folderId] : [],
    };

    const media = {
        mimeType: mimeType,
        body: bufferStream,
    };

    const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name',
    });

    // Make file publicly accessible
    await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        },
    });

    return `https://drive.google.com/uc?id=${response.data.id}&export=download`;
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

        // Try Google Drive upload
        const drive = initializeGoogleDrive();

        if (drive) {
            try {
                const publicUrl = await uploadToGoogleDrive(
                    drive,
                    fileBuffer,
                    fileName,
                    file.mimetype || 'application/octet-stream'
                );

                return res.status(200).json({
                    success: true,
                    path: publicUrl,
                    filename: fileName,
                });
            } catch (driveError) {
                console.error('Google Drive upload failed:', driveError.message);
                return res.status(500).json({
                    error: 'Google Drive upload failed. Please configure credentials.'
                });
            }
        } else {
            return res.status(500).json({
                error: 'Google Drive not configured. Please add environment variables.'
            });
        }
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: error.message });
    }
}
