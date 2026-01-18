/**
 * API utilities for catalog management and file uploads
 */

const MAX_VIDEO_SIZE = 5 * 1024 * 1024; // 5MB in bytes

/**
 * Load catalog data from JSON file
 */
export const loadCatalog = async () => {
    try {
        const response = await fetch(`/api/catalog?t=${Date.now()}`);
        if (!response.ok) {
            throw new Error('Failed to load catalog');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading catalog:', error);
        // Fallback to static file if API fails
        try {
            const fallbackResponse = await fetch('/data/catalog.json');
            return await fallbackResponse.json();
        } catch (fallbackError) {
            return [];
        }
    }
};

/**
 * Save catalog data to JSON file
 * Note: This requires a backend endpoint in production
 */
export const saveCatalog = async (catalogData) => {
    try {
        const response = await fetch('/api/save-catalog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(catalogData),
        });

        if (!response.ok) {
            throw new Error('Failed to save catalog');
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving catalog:', error);
        throw error;
    }
};

/**
 * Validate file before upload
 */
export const validateFile = (file, type = 'image') => {
    const errors = [];

    if (type === 'video') {
        if (file.size > MAX_VIDEO_SIZE) {
            errors.push(`Video file "${file.name}" exceeds 5MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
};

/**
 * Upload file to server
 * Returns the public path to the uploaded file
 */
export const uploadFile = async (file, category = 'products') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const data = await response.json();
        return data.path; // Returns path like "/assets/uploads/products/filename.jpg"
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

/**
 * Upload multiple files
 */
export const uploadFiles = async (files, category = 'products') => {
    const uploadPromises = Array.from(files).map(file => uploadFile(file, category));
    return await Promise.all(uploadPromises);
};

/**
 * Generate unique filename
 */
export const generateUniqueFilename = (originalName) => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop();
    const nameWithoutExt = originalName.replace(`.${extension}`, '').replace(/[^a-z0-9]/gi, '-').toLowerCase();
    return `${nameWithoutExt}-${timestamp}-${randomStr}.${extension}`;
};
