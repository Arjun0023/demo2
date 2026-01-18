import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { catalog } = useProducts();
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const whatsappNumber = "918446915179";

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
        setSelectedImage(foundProduct?.image || "");
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
        <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
                >
                    <FaArrowLeft /> Back
                </button>

                <div className="mx-auto max-w-6xl rounded-2xl bg-white shadow-xl ring-1 ring-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 sm:p-8 lg:p-10">
                        {/* Main Image */}
                        <div className="space-y-4">
                            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 border">
                                <img
                                    src={selectedImage || product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Photo Gallery */}
                            {product.photos && product.photos.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-3">Additional Photos</h3>
                                    <div className="grid grid-cols-4 gap-3">
                                        {product.photos.map((photo, idx) => {
                                            const isActive = photo === selectedImage;
                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setSelectedImage(photo)}
                                                    className={`aspect-square rounded-lg overflow-hidden border transition ${isActive ? "ring-2 ring-red-500 border-red-200" : "hover:opacity-90"}`}
                                                    aria-label={`View ${product.name} photo ${idx + 1}`}
                                                >
                                                    <img src={photo} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                                    {category?.name}
                                </span>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 leading-tight">{product.name}</h1>
                                <p className="text-xl sm:text-2xl font-semibold text-gray-800 mt-3">{product.price}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    const message = `Hi, I'm interested in ${product.name}. Please share details.`;
                                    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                                    window.open(url, "_blank", "noopener,noreferrer");
                                }}
                                className="inline-flex w-full items-center justify-center gap-2 bg-[#000000] text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition transform hover:-translate-y-0.5"
                                aria-label={`Contact on WhatsApp about ${product.name}`}
                            >
                                Contact for Inquiry
                                <FaWhatsapp className="h-5 w-5 text-green-400" />
                            </button>
                            <div className="prose max-w-none text-gray-600 leading-relaxed">
                                <p>{product.description}</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    const message = `Hi, I'm interested in ${product.name}. Please share details.`;
                                    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                                    window.open(url, "_blank", "noopener,noreferrer");
                                }}
                                className="inline-flex w-full items-center justify-center gap-2 bg-[#000000] text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition transform hover:-translate-y-0.5"
                                aria-label={`Contact on WhatsApp about ${product.name}`}
                            >
                                Contact for Inquiry
                                <FaWhatsapp className="h-5 w-5 text-green-400" />
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
