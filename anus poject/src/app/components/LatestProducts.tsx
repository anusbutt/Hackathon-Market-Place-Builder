'use client';

import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { Product } from '../../../types/products';
import { latestProducts } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { addToCart } from '../actions/actions';
import { Button } from '@/components/ui/button';

const LatestProducts =  () => {
  const [product, setProduct] = useState<Product[]>([]);
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct: Product[] = await client.fetch(latestProducts);  
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProduct();
  }, []);

  const handleaddToCart = (e: React.MouseEvent, product : Product) => {
    e.preventDefault()
    Swal.fire({
      position : "top-end",
      icon : "success",
      title : `${product.name} added to cart`,
      showConfirmButton : false,
      timer : 1000
    })
    addToCart(product)
  }
  

  return (
    <div className="w-full bg-white py-20">
      {/* Heading */}
      <h2 className="text-[#3F509E] text-4xl text-center font-bold mb-8">Latest Products</h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-8 mb-16">
        {["New Arrival", "Best Seller", "Featured", "Special Offers"].map((tab) => (
          <button
            key={tab}
            className="text-[#3F509E] text-lg font-medium relative group hover:text-[#FB2E86]"
          >
            {tab}
            {/* Underline */}
            <span
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FB2E86] transition-all duration-300 group-hover:w-full"
            ></span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {product.map((product) => (
          <div key={product.name} className="relative group">
            <Link href={`/product/${product.slug?.current}`}>

            {/* Product Image */}
            <div className="w-full bg-gray-200 flex justify-center items-center relative overflow-hidden h-[300px] transition-all duration-300 group-hover:bg-white">
              {/* Sale Tag */}
              {product.sale && (
                <span className="absolute top-2 left-2 bg-[#3F509E] text-white text-sm px-3 py-1 rounded">
                  Sale
                </span>
              )}
              {product.image && (
              <Image
                src={urlFor(product.image).url()}
                width={200}
                height={200}
                alt={product.name}// Dynamic alt text for accessibility
                className="object-contain"
                priority
              />
              )}

              {/* Icons */}
              <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white p-2 rounded-full shadow">
                  <HeartIcon className="w-6 h-6 text-[#3F509E]" />
                </button>
                <button className="bg-white p-2 rounded-full shadow">
                  <MagnifyingGlassIcon className="w-6 h-6 text-[#3F509E]" />
                </button>
                <button className="bg-white p-2 rounded-full shadow">
                  <ShoppingCartIcon className="w-6 h-6 text-[#3F509E]" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-[#3F509E]">{product.name}</h3>
              <div className="mt-2 text-gray-600 flex justify-center items-center gap-2">
                {product.sale ? (
                  <>
                    <span className="text-red-600 font-medium line-through">{product.oldPrice}</span>
                    <span className="text-gray-800">{product.price}</span>
                  </>
                ) : (
                  <span className="text-gray-800">{product.price}</span>
                )}
              </div>
            </div>
            <Button className="bg-gradient-to-t from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={((e) => handleaddToCart(e, product))}
            >
              Add to Cart
            </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestProducts;

