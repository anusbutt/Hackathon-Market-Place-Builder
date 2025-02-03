"use client";
import Image from "next/image";
import Link from "next/link";
import swal from "sweetalert2";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineEye,
} from "react-icons/ai";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import { useState, useEffect } from "react";
import { Product } from "../../../types/products";
import { addToCart } from "../actions/actions";
import { urlFor } from "@/sanity/lib/image";

const ShopListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProducts: Product[] = await client.fetch(allProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProduct();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    swal.fire({
      position: "top-end",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };

  return (
    <>
      <Header />
      <div className="font-sans text-[#151875]">
        {/* Header Section */}
        <div className="py-28 px-8">
          <h1 className="text-4xl font-bold">Shop List</h1>
          <div className="flex items-center gap-2">
            <Link href={"/"}>Home</Link>
            <p>Pages</p>
            <p className="text-[#FB2E86]">Shopping List</p>
          </div>
        </div>

        {/* Filter and Sorting Section */}
        <div className="py-4 flex flex-col lg:flex-row justify-between px-8">
          <div>
            <h1 className="text-2xl font-semibold font-[Josefin Sans] mb-2">
              Ecommerce Accessories & Fashion Items
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              About 9,620 results (0.62 seconds)
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Per Page */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="perPage"
                className="text-sm font-medium text-gray-700"
              >
                Per Page:
              </label>
              <input
                type="text"
                id="perPage"
                className="w-16 p-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#FB2E86]"
              />
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sortBy"
                className="text-sm font-medium text-gray-700"
              >
                Sort By:
              </label>
              <select
                id="sortBy"
                className="p-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#FB2E86]"
              >
                <option value="bestMatch">Best Match</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
              </select>
            </div>

            {/* View */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="view"
                className="text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#FB2E86]"
              >
                View:
              </label>
              <input
                type="text"
                id="view"
                className="w-16 p-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#FB2E86]"
              />
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="p-8">
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product._id} // Use a unique identifier, such as 'id' or '_id'
                className="group relative flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="lg:w-1/3 flex-shrink-0">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="w-full h-48 object-contain rounded-lg"
                    />
                  )}
                </div>

                {/* Product Details */}
                <div className="lg:w-2/3 lg:ml-6 mt-4 lg:mt-0">
                  <div className="w-full flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    {/* Color Options */}
                    <div className="mt-2 flex gap-1">
                      {product.colors?.map(
                        (color: string, index: number) => (
                          <span
                            key={index}
                            className={`w-3 h-3 ${color} rounded-full`}
                          ></span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Price and Old Price */}
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="text-lg font-bold">{product.price}</span>
                    <span className="text-red-500 line-through">
                      {product.oldPrice}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 w-96">
                    {product.description || 'No description available'}
                  </p>

                  {/* Rating */}
                  <div className="mt-2 flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={`${
                          index < product.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } text-lg`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex space-x-4">
                    <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
                      <AiOutlineHeart size={24} />
                    </button>
                    <Link href="/cart">
                      <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
                        <AiOutlineShoppingCart size={24} />
                      </button>
                    </Link>
                    <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
                      <AiOutlineEye size={24} />
                    </button>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="absolute bottom-0 w-full text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/product/${product.slug?.current}`}>
                    <button className="flex text-center justify-center w-full lg:w-[calc(100%/3)] py-2 text-sm bg-[#151875] rounded-full hover:bg-[#151875] transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopListProducts;
