'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Product } from '../../../types/products';
import { client } from '@/sanity/lib/client';
import { trendingProducts } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { addToCart } from '../actions/actions';
import { Button } from '@/components/ui/button';

const TrendingProducts = () => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct: Product[] = await client.fetch(trendingProducts);  // Ensure `trendingProducts` query is defined
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProduct();
  }, []);

  const handleAddToCart = (e:React.MouseEvent, product:Product) => {
    e.preventDefault()
    Swal.fire({
      position: "top-right",
      icon: "success",
      title : `${product.name} added to cart`,
      showConfirmButton : false,
      timer : 1000
    })
    addToCart(product)
  }

  return (
    <div className="w-full bg-white py-20">
      {/* Section Heading */}
      <h2 className="text-[#3F509E] text-3xl font-bold text-center mb-16">Trending Products</h2>

      {/* Product Grid */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20">
        {product.map((product) => (
          <div key={product.name} className="group relative">
            <Link href={`/product/${product.slug.current}`}>
            {/* Image with Gray Background */}
            <div className="bg-gray-200 flex justify-center items-center p-6 h-[280px] relative">
              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  alt={`${product.name} Image`}
                  width={200}
                  height={200}
                  className="object-contain transition-all duration-300 group-hover:opacity-90"
                />
              )}
            </div>

            {/* Product Details */}
            <div className="mt-4 text-center">
              <h3 className="text-[#3F509E] font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-[#3F509E] font-bold inline-block">{product.price}</p>
              <span className="text-gray-500 line-through ml-2">{product.originalPrice}</span>
            </div>
            <Button className="bg-gradient-to-t from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={((e) => handleAddToCart(e, product))}
            >
              Add to Cart
            </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Vouchers and Product List Section */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Voucher 1 */}
        <div className="bg-pink-100 p-8 flex flex-col justify-between relative h-[200px]">
          <h3 className="text-[#3F509E] text-2xl font-bold mb-4">23% Off in all products</h3>
          <button className="text-pink-600 underline text-lg font-medium">Shop Now</button>
          <Image
            src="/images/voucher1.png"
            alt="Voucher for 23% Off"
            width={200}
            height={200}
            className="absolute bottom-2 right-0 object-contain"
          />
        </div>

        {/* Voucher 2 */}
        <div className="bg-pink-100 p-8 flex flex-col justify-between relative h-[200px]">
          <h3 className="text-[#3F509E] text-2xl font-bold mb-4">23% Off in all products</h3>
          <button className="text-pink-600 underline text-lg font-medium mt-4">
            View Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
