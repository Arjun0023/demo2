import { useState } from "react";
import SecondaryHeading from "../headings/SecondaryHeading";
import TertiaryHeading from "../headings/TertiaryHeading";

const productCategories = ["All", "Dumbbells", "Treadmills", "Benches", "Barbells", "Resistance Bands", "Accessories"];

const productsData = [
  {
    id: 1,
    name: "Adjustable Dumbbells Set",
    category: "Dumbbells",
    description: "Premium quality adjustable dumbbells with multiple weight options",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Professional Treadmill",
    category: "Treadmills",
    description: "High-performance treadmill with advanced features for home and commercial use",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Olympic Weight Bench",
    category: "Benches",
    description: "Heavy-duty adjustable bench perfect for serious weight training",
    image: "https://images.unsplash.com/photo-1584863265045-f9d10ca7fa61?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Olympic Barbell Set",
    category: "Barbells",
    description: "Professional grade Olympic barbell with weight plates",
    image: "https://images.unsplash.com/photo-1526401363239-a55b8b001d92?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Resistance Band Set",
    category: "Resistance Bands",
    description: "Complete set of resistance bands for versatile training",
    image: "https://images.unsplash.com/photo-1598266663439-2056e6aac492?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Gym Accessories Pack",
    category: "Accessories",
    description: "Essential gym accessories including gloves, straps, and more",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Hex Dumbbells Set",
    category: "Dumbbells",
    description: "Rubber coated hex dumbbells for comfortable grip",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    name: "Incline Treadmill",
    category: "Treadmills",
    description: "Advanced incline treadmill with heart rate monitoring",
    image: "https://images.unsplash.com/photo-1578874691223-64558a3ca096?w=400&h=300&fit=crop"
  },
  {
    id: 9,
    name: "Power Rack",
    category: "Accessories",
    description: "Heavy-duty power rack for safe and effective training",
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&h=300&fit=crop"
  },
  {
    id: 10,
    name: "Kettlebell Set",
    category: "Accessories",
    description: "Complete kettlebell set from 5kg to 30kg",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&h=300&fit=crop"
  },
  {
    id: 11,
    name: "Flat Bench",
    category: "Benches",
    description: "Commercial grade flat bench for various exercises",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop"
  },
  {
    id: 12,
    name: "EZ Curl Bar",
    category: "Barbells",
    description: "Ergonomic EZ curl bar for bicep and tricep workouts",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=300&fit=crop"
  }
];

function ProductsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? productsData 
    : productsData.filter(product => product.category === selectedCategory);

  return (
    <section id="products" className="py-12 sm:py-20 bg-gray-50">
      <div className="container px-4 sm:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <SecondaryHeading textColor="white" bgColor="red">
            Our Products
          </SecondaryHeading>
          <TertiaryHeading>
            Premium Gym Equipment
          </TertiaryHeading>
          <p className="text-gray-350 text-sm sm:text-base px-4">
            Discover our wide range of professional gym equipment designed to meet all your fitness needs
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
          {productCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-red text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-6">
                <span className="text-xs sm:text-sm text-red font-medium">
                  {product.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-600 mt-1 sm:mt-2 mb-2 sm:mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-350 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2">
                  {product.description}
                </p>
                <button className="focus relative inline-flex items-center justify-center gap-1.5 bg-gray-600 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase text-white before:absolute before:left-2 before:top-[-8px] before:z-[-1] before:h-full before:w-full before:border before:border-solid before:border-red/50 before:transition-all before:duration-500 hover:before:translate-x-[-8px] hover:before:translate-y-[8px] w-full sm:w-auto">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsCatalog;
