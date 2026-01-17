import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function Shop() {
    const { catalog } = useProducts();

    return (
        <section className="bg-gray-50 py-20 min-h-screen">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Our Products
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {catalog.map((category) => (
                        <Link
                            to={`/category/${category.id}`}
                            key={category.id}
                            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="aspect-w-16 aspect-h-9 h-64 w-full">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-2xl font-bold text-white tracking-wider uppercase border-b-2 border-transparent group-hover:border-white transition-all">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Shop;
