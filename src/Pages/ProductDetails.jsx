import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { catalog } = useProducts();
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        // Find product across all categories
        let foundProduct = null;
        let foundCategory = null;

        for (const cat of catalog) {
            const prod = cat.products.find(p => p.id === id);
            if (prod) {
                foundProduct = prod;
                foundCategory = cat;
                break;
            }
        }

        setProduct(foundProduct);
        setCategory(foundCategory);
    }, [id, catalog]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">Product not found</p>
                    <button onClick={() => navigate("/shop")} className="text-red-600 hover:underline">Return to Shop</button>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-gray-50 py-12 min-h-screen">
            <div className="container mx-auto px-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
                >
                    <FaArrowLeft /> Back
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Main Image */}
                        <div className="space-y-4">
                            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Photo Gallery */}
                            {product.photos && product.photos.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-2">Photos</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        {product.photos.map((photo, idx) => (
                                            <div key={idx} className="aspect-square rounded overflow-hidden border cursor-pointer hover:opacity-90 transition">
                                                <img src={photo} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">{category?.name}</span>
                                <h1 className="text-4xl font-bold text-gray-900 mt-2">{product.name}</h1>
                                <p className="text-2xl font-bold text-gray-800 mt-4">{product.price}</p>
                            </div>

                            <div className="prose text-gray-600">
                                <p>{product.description}</p>
                            </div>

                            <button className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition transform hover:-translate-y-1">
                                Contact for Inquiry
                            </button>

                            {/* Videos Section */}
                            {product.videos && product.videos.length > 0 && (
                                <div className="pt-8 border-t">
                                    <h3 className="font-bold text-xl text-gray-800 mb-4">Product Videos</h3>
                                    <div className="space-y-4">
                                        {product.videos.map((video, idx) => (
                                            <div key={idx} className="aspect-video bg-black rounded-lg overflow-hidden">
                                                <video controls className="w-full h-full">
                                                    <source src={video} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetails;
