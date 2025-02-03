'use client';

import { topCategoryProducts } from '@/sanity/lib/queries';
import Image from 'next/image';
import { Product } from '../../../types/products';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { addToCart } from '../actions/actions';
import { Button } from '@/components/ui/button';

function TopCategories() {
  const [product, setProduct] = useState<Product[]>([]);
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct: Product[] = await client.fetch(topCategoryProducts);  // Ensure `featureProducts` is defined
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProduct();
  }, []);

  const HandleAddToCart = ((e:React.MouseEvent, product: Product) => {
    e.preventDefault()
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer : 1000
    })
    addToCart(product)
  })

  return (
    <div className="w-full bg-white py-20">
      {/* Heading */}
      <h2 className="text-center text-[#3F509E] text-3xl font-bold mb-12">Top Categories</h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        {product.map((product) => (
          <div key={product.name} className="relative group flex flex-col items-center">
            <Link href={`/product/${product.slug?.current}`}>
            {/* Circle Image with Hover Effect */}
            <div className="w-[150px] h-[150px] flex justify-center items-center bg-gray-200 rounded-full relative overflow-hidden">
              {product.image && (
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}  // Ensure alt text describes the item
                width={120}
                height={120}
                className="object-cover"
              />
              )}
              {/* Hover Blue Circle Outline */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#3F509E] transition-all duration-300"></div>

              {/* Hover View Shop Button */}
              <button
                className="absolute bottom-2 bg-[#08D15F] text-white px-3 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label={`View shop for ${product.name}`}  // Accessibility improvement
              >
                View Shop
              </button>
            </div>

            {/* Category Name and Price */}
            <h3 className="text-[#3F509E] font-bold mt-4">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
            <Button className="bg-gradient-to-t from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={((e) => HandleAddToCart(e, product))}
            >
              Add to Cart
            </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pink Dots */}
      <div className="flex justify-center mt-4">
        <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
        <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
        <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
      </div>
    </div>
  );
}

export default TopCategories;
