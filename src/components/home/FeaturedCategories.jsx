import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import SecondaryHeading from "../headings/SecondaryHeading";
import TertiaryHeading from "../headings/TertiaryHeading";

const FILTERS = ["All", "Sports", "Flooring", "Decor"];

function FeaturedCategories() {
    const { catalog } = useProducts();
    const [activeFilter, setActiveFilter] = useState("All");



    const EXCLUDED_IDS = ['carpets', 'wallpapers', 'interior', 'foster', 'pots', 'epdm'];
    const EXCLUDED_NAMES = [
        'carpets',
        'wall papers',
        'interior design',
        'foster filming',
        'artificial flower pot',
        'epdm flooring'
    ];

    // Filter out excluded categories by ID and Name
    const visibleCatalog = catalog.filter(cat => {
        const matchesId = EXCLUDED_IDS.includes(cat.id);
        const matchesName = EXCLUDED_NAMES.includes(cat.name.toLowerCase());
        return !matchesId && !matchesName;
    });

    const filteredCatalog = activeFilter === "All"
        ? visibleCatalog
        : visibleCatalog.filter(cat => cat.tags && cat.tags.includes(activeFilter.toLowerCase()));

    return (
        <section className="py-20 bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <SecondaryHeading textColor="white" bgColor="red">
                        What We Offer
                    </SecondaryHeading>
                    <TertiaryHeading>
                        Explore Our Premium Catalog
                    </TertiaryHeading>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all duration-300 ${activeFilter === filter
                                ? "bg-red text-white"
                                : "bg-white text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCatalog.map((cat) => (
                        <Link
                            to={`/category/${cat.linkId || cat.id}`}
                            key={cat.id}
                            className="group relative h-80 overflow-hidden rounded-xl shadow-lg bg-white"
                        >
                            <div className="h-full w-full overflow-hidden">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-12">
                                <span className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1 block">
                                    {cat.tags ? cat.tags[0] : 'Product'}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{cat.name}</h3>
                                <span className="text-white/80 text-sm group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                                    View Collection →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {
                    filteredCatalog.length === 0 && (
                        <p className="text-center text-gray-500 mt-8">No categories found for this filter.</p>
                    )
                }
            </div >
        </section >
    );
}

export default FeaturedCategories;
