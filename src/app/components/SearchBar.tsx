import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { client } from "@/sanity/lib/client"; // Adjust the import based on your setup
import { allProducts } from "@/sanity/lib/queries"; // Import your predefined query

// Define product type
interface Product {
  _id: string;
  name: string;  // Use 'name' instead of 'title'
  slug: { current: string }; // Assuming your Sanity schema includes a slug
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]); // Store fetched products
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Fetch products from Sanity when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Product[] = await client.fetch(allProducts); // Using your allProducts query
        console.log("Fetched Products:", fetchedProducts); // Log the fetched products
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  // Debounced search with filtering logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilteredProducts([]);
        setShowResults(false);
      } else {
        const results = products.filter((product) =>
          product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Use 'name' here
        );
        console.log("Filtered Results:", results); // Log the filtered results
        setFilteredProducts(results);
        setShowResults(true);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, products]);

  // Handle key navigation (ArrowDown, ArrowUp, Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, filteredProducts.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      window.location.href = `/product/${filteredProducts[activeIndex].slug.current}`;
    }
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="flex items-center border rounded-md overflow-hidden bg-gray-100">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-60 px-3 py-2 text-sm outline-none bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="p-2 bg-[#FB2E86] text-white hover:bg-[#F94C9B] transition-colors">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <ul className="absolute w-60 bg-white border rounded-md shadow-lg mt-1 z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <li
                key={product._id}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                  index === activeIndex ? "bg-gray-300" : ""
                }`}
                onClick={() => (window.location.href = `/product/${product.slug.current}`)}
              >
                <Link href={`/product/${product.slug?.current}`} className="block">
                  {product.name}  {/* Use 'name' here */}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No products found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;