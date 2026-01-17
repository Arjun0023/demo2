import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

function SearchPage() {
    const { searchProducts } = useProducts();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        const hits = searchProducts(query);
        setResults(hits);
    };

    return (
        <div className="min-h-screen bg-white py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Search Catalog</h1>
                <form onSubmit={handleSearch} className="flex gap-4 mb-12">
                    <input
                        type="text"
                        className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-full focus:border-red-500 focus:outline-none text-lg"
                        placeholder="Search for turf, flooring, etc..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition">
                        Search
                    </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {results.map((product) => (
                        <div key={product.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-lg transition">
                            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
                            <div>
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-1">{product.categoryName}</p>
                                <p className="font-semibold text-red-600">{product.price}</p>
                                <Link to="#" className="text-xs text-blue-600 hover:underline">View</Link>
                            </div>
                        </div>
                    ))}
                    {query && results.length === 0 && (
                        <p className="text-center text-gray-500">No results found for "{query}"</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
