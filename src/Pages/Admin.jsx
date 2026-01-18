import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { FaEdit, FaTrash, FaPlus, FaImage } from "react-icons/fa";
import { uploadFile, validateFile } from "../utils/api";

function Admin() {
    const {
        isAdmin, loginAdmin, logoutAdmin, catalog,
        addCategory, editCategory, deleteCategory,
        addProduct, editProduct, deleteProduct
    } = useProducts();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("products"); // 'products' or 'categories'

    // --- Category Forms State ---
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [categoryForm, setCategoryForm] = useState({ id: "", name: "", image: "", tags: "", subcategories: [] });
    const [categoryImageFile, setCategoryImageFile] = useState(null);
    const [uploadingCategory, setUploadingCategory] = useState(false);

    // --- Product Forms State ---
    const [isEditingProduct, setIsEditingProduct] = useState(false);
    const [selectedCatIdForProd, setSelectedCatIdForProd] = useState("");
    const [productForm, setProductForm] = useState({
        id: "", name: "", price: "", description: "", image: "", subCategoryId: "",
        photos: [], videos: []
    });
    const [productImageFile, setProductImageFile] = useState(null);
    const [uploadingProduct, setUploadingProduct] = useState(false);

    const handleCategoryImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCategoryImageFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setCategoryForm(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProductImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImageFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductForm(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = async (e, type) => {
        const files = Array.from(e.target.files);
        const validFiles = [];
        const errors = [];

        for (const file of files) {
            const validation = validateFile(file, type === 'videos' ? 'video' : 'image');
            if (validation.valid) {
                validFiles.push(file);
            } else {
                errors.push(...validation.errors);
            }
        }

        if (errors.length > 0) {
            alert(errors.join('\n'));
        }

        // Create previews for valid files
        for (const file of validFiles) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductForm(prev => ({
                    ...prev,
                    [type]: [...(prev[type] || []), { file, preview: reader.result }]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeMedia = (type, index) => {
        setProductForm(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginAdmin(username, password)) {
            setError("");
        } else {
            setError("Invalid credentials");
        }
    };

    // --- Category Handlers ---
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        setUploadingCategory(true);

        try {
            const tagsArray = typeof categoryForm.tags === 'string' ? categoryForm.tags.split(",").map(t => t.trim()) : categoryForm.tags;
            let imagePath = categoryForm.image;

            // Upload new image if file selected
            if (categoryImageFile) {
                imagePath = await uploadFile(categoryImageFile, 'categories');
            }

            const data = { ...categoryForm, tags: tagsArray, image: imagePath };

            if (isEditingCategory) {
                editCategory(categoryForm.id, data);
            } else {
                addCategory({ ...data, id: Date.now().toString() });
            }
            resetCategoryForm();
        } catch (error) {
            alert('Failed to save category: ' + error.message);
        } finally {
            setUploadingCategory(false);
        }
    };

    const startEditCategory = (cat) => {
        setCategoryForm({ ...cat, tags: cat.tags.join(", ") });
        setIsEditingCategory(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm("Are you sure? This will delete all products within this category.")) {
            deleteCategory(id);
        }
    };

    const resetCategoryForm = () => {
        setCategoryForm({ id: "", name: "", image: "", tags: "", subcategories: [] });
        setCategoryImageFile(null);
        setIsEditingCategory(false);
    };

    // --- Product Handlers ---
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCatIdForProd) {
            alert("Please select a category first.");
            return;
        }

        setUploadingProduct(true);

        try {
            let imagePath = productForm.image;
            let photoPaths = [];
            let videoPaths = [];

            // Upload main image if new file selected
            if (productImageFile) {
                imagePath = await uploadFile(productImageFile, 'products');
            }

            // Upload photos
            for (const item of productForm.photos) {
                if (item.file) {
                    const path = await uploadFile(item.file, 'products');
                    photoPaths.push(path);
                } else if (typeof item === 'string') {
                    photoPaths.push(item);
                }
            }

            // Upload videos
            for (const item of productForm.videos) {
                if (item.file) {
                    const path = await uploadFile(item.file, 'products');
                    videoPaths.push(path);
                } else if (typeof item === 'string') {
                    videoPaths.push(item);
                }
            }

            const data = {
                ...productForm,
                image: imagePath,
                photos: photoPaths,
                videos: videoPaths
            };

            if (isEditingProduct) {
                editProduct(selectedCatIdForProd, productForm.id, data);
            } else {
                addProduct(selectedCatIdForProd, data);
            }
            resetProductForm();
        } catch (error) {
            alert('Failed to save product: ' + error.message);
        } finally {
            setUploadingProduct(false);
        }
    };

    const startEditProduct = (catId, prod) => {
        setSelectedCatIdForProd(catId);
        setProductForm(prod);
        setIsEditingProduct(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDeleteProduct = (catId, prodId) => {
        if (window.confirm("Delete this product?")) {
            deleteProduct(catId, prodId);
        }
    };

    const resetProductForm = () => {
        setProductForm({ id: "", name: "", price: "", description: "", image: "", subCategoryId: "", photos: [], videos: [] });
        setProductImageFile(null);
        setIsEditingProduct(false);
    };


    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 border rounded focus:border-red-500 focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded focus:border-red-500 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="w-full bg-[#000000] hover:bg-gray-800 text-white py-2 rounded transition-colors">
                            Login
                        </button>
                        <p className="text-xs text-gray-500 text-center">Hint: admin / admin123</p>
                    </form>
                </div>
            </div>
        );
    }

    const currentCategoryForProduct = catalog.find(c => c.id === selectedCatIdForProd);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Welcome, Admin</span>
                        <button onClick={logoutAdmin} className="text-red-600 hover:text-red-800 font-semibold text-sm">Logout</button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex mb-8 border-b">
                    <button
                        className={`px-6 py-3 font-semibold ${activeTab === 'products' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Manage Products
                    </button>
                    <button
                        className={`px-6 py-3 font-semibold ${activeTab === 'categories' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('categories')}
                    >
                        Manage Categories
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'categories' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* List Categories */}
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="text-xl font-bold mb-4">Existing Categories</h2>
                            {catalog.map(cat => (
                                <div key={cat.id} className="bg-white p-4 rounded shadow flex items-center gap-4">
                                    <img src={cat.image} alt={cat.name} className="w-16 h-16 object-cover rounded bg-gray-200" />
                                    <div className="flex-1">
                                        <h3 className="font-bold">{cat.name}</h3>
                                        <p className="text-sm text-gray-500">{cat.tags.join(", ")}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => startEditCategory(cat)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><FaEdit /></button>
                                        <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add/Edit Category Form */}
                        <div className="bg-white p-6 rounded shadow h-fit sticky top-4">
                            <h2 className="text-xl font-bold mb-4">{isEditingCategory ? "Edit Category" : "Add New Category"}</h2>
                            <form onSubmit={handleCategorySubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Name</label>
                                    <input type="text" className="w-full p-2 border rounded" value={categoryForm.name} onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Tags (comma separated)</label>
                                    <input type="text" className="w-full p-2 border rounded" value={categoryForm.tags} onChange={e => setCategoryForm({ ...categoryForm, tags: e.target.value })} placeholder="sports, indoor" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Category Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full p-2 border rounded"
                                        onChange={handleCategoryImageChange}
                                    />
                                    {categoryForm.image && <img src={categoryForm.image} alt="Preview" className="w-full h-32 object-cover mt-2 rounded bg-gray-100" />}
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#000000] text-white py-2 rounded hover:bg-gray-800 transition disabled:bg-gray-400"
                                        disabled={uploadingCategory}
                                    >
                                        {uploadingCategory ? "Saving..." : (isEditingCategory ? "Save Changes" : "Add Category")}
                                    </button>
                                    {isEditingCategory && (
                                        <button type="button" onClick={resetCategoryForm} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}


                {activeTab === 'products' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* List Products */}
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-xl font-bold mb-4">All Products</h2>
                            {catalog.map(cat => (
                                <div key={cat.id} className="mb-6">
                                    <h3 className="font-bold text-gray-500 uppercase text-sm mb-2 border-b pb-1">{cat.name}</h3>
                                    <div className="space-y-2">
                                        {cat.products.length === 0 ? <p className="text-sm text-gray-400 italic">No products</p> :
                                            cat.products.map(prod => (
                                                <div key={prod.id} className="bg-white p-3 rounded border flex items-center gap-4 hover:shadow-md transition">
                                                    <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded bg-gray-200" />
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-sm">{prod.name}</h4>
                                                        <p className="text-xs text-gray-500">{prod.price}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => startEditProduct(cat.id, prod)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><FaEdit /></button>
                                                        <button onClick={() => handleDeleteProduct(cat.id, prod.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><FaTrash /></button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add/Edit Product Form */}
                        <div className="bg-white p-6 rounded shadow h-fit sticky top-4">
                            <h2 className="text-xl font-bold mb-4">{isEditingProduct ? "Edit Product" : "Add New Product"}</h2>
                            <form onSubmit={handleProductSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Select Category</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={selectedCatIdForProd}
                                        onChange={e => setSelectedCatIdForProd(e.target.value)}
                                        disabled={isEditingProduct} // Lock category when editing for simplicity
                                        required
                                    >
                                        <option value="">-- Select Category --</option>
                                        {catalog.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </select>
                                </div>

                                {currentCategoryForProduct?.subcategories?.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Sub Category</label>
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={productForm.subCategoryId || ""}
                                            onChange={(e) => setProductForm({ ...productForm, subCategoryId: e.target.value })}
                                        >
                                            <option value="">None</option>
                                            {currentCategoryForProduct.subcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                                        </select>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold mb-1">Name</label>
                                    <input type="text" className="w-full p-2 border rounded" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Price</label>
                                    <input type="text" className="w-full p-2 border rounded" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} placeholder="Contact for Price" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Main Product Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full p-2 border rounded"
                                        onChange={handleProductImageChange}
                                        required={!productForm.image}
                                    />
                                    {productForm.image && <img src={productForm.image} alt="Preview" className="w-full h-32 object-cover mt-2 rounded bg-gray-100" />}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">Additional Photos</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="w-full p-2 border rounded"
                                        onChange={(e) => handleFileChange(e, 'photos')}
                                    />
                                    {productForm.photos && productForm.photos.length > 0 && (
                                        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                                            {productForm.photos.map((item, idx) => (
                                                <div key={idx} className="relative flex-shrink-0 w-20 h-20">
                                                    <img src={item.preview || item} alt="Preview" className="w-full h-full object-cover rounded bg-gray-100" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeMedia('photos', idx)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">Product Videos</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="video/*"
                                        className="w-full p-2 border rounded"
                                        onChange={(e) => handleFileChange(e, 'videos')}
                                    />
                                    {productForm.videos && productForm.videos.length > 0 && (
                                        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                                            {productForm.videos.map((item, idx) => (
                                                <div key={idx} className="relative flex-shrink-0 w-32 h-20 bg-black rounded overflow-hidden">
                                                    <video src={item.preview || item} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeMedia('videos', idx)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs z-10"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Description</label>
                                    <textarea className="w-full p-2 border rounded h-20" value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} required></textarea>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#000000] text-white py-2 rounded hover:bg-gray-800 transition disabled:bg-gray-400"
                                        disabled={uploadingProduct}
                                    >
                                        {uploadingProduct ? "Saving..." : (isEditingProduct ? "Save Changes" : "Add Product")}
                                    </button>
                                    {isEditingProduct && (
                                        <button type="button" onClick={resetProductForm} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
