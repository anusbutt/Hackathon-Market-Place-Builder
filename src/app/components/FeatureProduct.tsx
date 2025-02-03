"use client";
import swal from "sweetalert2";
import Image from "next/image";
import {
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { client } from "@/sanity/lib/client";
import { featureProduct } from "@/sanity/lib/queries";
import React, { useState, useEffect } from "react";
import { Product } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { addToCart } from "../actions/actions";
import { Button } from "@/components/ui/button";

const FeatureProducts = () => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct: Product[] = await client.fetch(featureProduct); // Ensure `featureProducts` is defined
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProduct();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
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
    <div className="w-full bg-white py-12 md:py-20">
    {/* Heading */}
    <h2 className="text-black text-3xl sm:text-4xl text-center mb-8 sm:mb-16 font-bold">
      Featured Products
    </h2>
  
    {/* Product Grid */}
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {product.map((product) => (
        <div
          key={product.name}
          className="relative group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Product Image */}
          <div className="w-full bg-gray-100 flex justify-center items-center relative overflow-hidden h-[300px] sm:h-[350px]">
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                width={200}
                height={250}
                alt={product.name}
                className="object-cover w-[200px] h-[250px] transition-all duration-300 group-hover:scale-105"
              />
            )}
  
            {/* Icons (Wishlist, View Details, and Zoom) */}
            <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Wishlist Icon */}
              <button className="bg-white p-2 rounded-full shadow-md hover:shadow-lg">
                <HeartIcon className="w-6 h-6 text-gray-700" />
              </button>
              {/* Magnifying Glass Icon */}
              <button className="bg-white p-2 rounded-full shadow-md hover:shadow-lg">
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-700" />
              </button>
              {/* Cart Icon */}
              <button className="bg-white p-2 rounded-full shadow-md hover:shadow-lg">
                <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
              </button>
            </div>
  
            {/* Add to Cart Button */}
            <div className="absolute bottom-0 w-full text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={`/product/${product.slug.current}`}>
                <button className="w-full py-2 text-sm bg-[#08D15F] hover:bg-green-700 transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
  
          {/* Product Details */}
          <div className="text-center p-4">
            <h3 className="text-lg font-semibold text-red-500">
              {product.name}
            </h3>
            <div className="flex justify-center items-center gap-1 mt-1">
              <span className="text-[#05E6B7] text-4xl">-</span>
              <span className="text-[#F701A8] text-4xl">-</span>
              <span className="text-[#00009D] text-4xl">-</span>
            </div>
            <p className="mt-1 text-dark-blue-900">{product.price}</p>
          </div>
  
          {/* Add to Cart Button */}
          <div className="p-4">
            <Button
              className="w-full bg-gradient-to-t from-blue-500 to-purple-500 text-white font-semibold py-2 px-4  rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={(e) => handleAddToCart(e, product)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>  );
};

export default FeatureProducts;
