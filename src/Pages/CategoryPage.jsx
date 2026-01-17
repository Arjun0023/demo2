import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";

function CategoryPage() {
    const { id } = useParams();
    const { catalog } = useProducts();
    const [selectedSub, setSelectedSub] = useState("all");

    const category = catalog.find((cat) => cat.id === id);

    if (!category) return <div className="text-center py-20">Category not found</div>;

    const hasSubcategories = category.subcategories && category.subcategories.length > 0;

    const displayedProducts = hasSubcategories && selectedSub !== "all"
        ? category.products.filter(p => p.subCategoryId === selectedSub)
        : category.products;

    return (
        <section className="bg-white py-20 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{category.name}</h1>
                    <div className="h-1 w-20 bg-red mx-auto text-red-500 rounded"></div>
                </div>

                {hasSubcategories && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <button
                            onClick={() => setSelectedSub("all")}
                            className={`px-6 py-2 rounded-full transition-all ${selectedSub === "all"
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            All
                        </button>
                        {category.subcategories.map((sub) => (
                            <button
                                key={sub.id}
                                onClick={() => setSelectedSub(sub.id)}
                                className={`px-6 py-2 rounded-full transition-all ${selectedSub === sub.id
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {sub.name}
                            </button>
                        ))}
                    </div>
                )}

                {displayedProducts.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">No products found in this category.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayedProducts.map((product) => (
                            <div key={product.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 overflow-hidden">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-red-600">{product.price}</span>
                                        <Link to={`/product/${product.id}`} className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors">
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default CategoryPage;
