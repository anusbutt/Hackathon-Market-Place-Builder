// components/AddToCartButton.tsx
'use client'

import Swal from "sweetalert2";
import { Product } from "../../../types/products";
import { addToCart } from "@/app/actions/actions";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
