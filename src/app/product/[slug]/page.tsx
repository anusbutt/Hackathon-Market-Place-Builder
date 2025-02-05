// app/product/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import AddToCartButton from "@/app/components/AddToCartButton";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

// Define the type for params
interface ProductPageParams {
  slug: string;
}

interface ProductPageProps {
  product: Product | null;
}

// This is now an async component
export default async function ProductPage({ params }: { params: Promise<ProductPageParams> }) {
  const resolvedParams = await params; // Await the params
  const { slug } = resolvedParams; // Now you can safely access slug

  // Fetch product data from Sanity
  const product: Product = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      id,
      name,
      _type,
      image,
      price,
    }`,
    { slug }
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-xl font-semibold">Product not found</span>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                {product.image && (
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    height={400}
                    width={400}
                    className="object-contain"
                  />
                )}
              </div>

              {/* Product Information */}
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-semibold text-gray-800">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    (Inclusive of taxes)
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Use the Client Component for Add to Cart button */}
                  <AddToCartButton product={product} />
                  <Link href={"/checkout"}>
                    <button className="mt-4 w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300">
                      Buy Now
                    </button>
                  </Link>
                </div>

                <div className="text-gray-600">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section (Optional) */}
        </div>
      </div>
      <Footer />
    </>
  );
}