"use client";

import { Product } from "../../../types/products";
import React, { useEffect, useState } from "react";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../actions/actions";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = () => {
      const cart = getCartItems(); // Fetch cart items (assuming sync here, adjust if async)
      setCartItems(cart);
    };

    fetchCartItems();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems()); // Update cart state after removal
        Swal.fire(
          "Removed!",
          "Item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems()); // Update cart state after quantity change
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantityChange(id, product.inventory + 1); // Increment quantity
    }
  };

  const handleDecrement = (_id: string) => {
    const product = cartItems.find((item) => item._id === _id);
    if (product && product.inventory > 1) {
      handleQuantityChange(_id, product.inventory - 1); // Decrement quantity
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.inventory,
      0
    );
  };

  const router = useRouter();

  const handleProceed = () => {
    Swal.fire({
      title: "Processing your order...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Success!",
          "Your order has been successfully processed!",
          "success"
        );
        // Clear the cart after proceeding (optional)
        setCartItems([]); // Optionally clear cart after proceeding
      }
      router.push("/checkout");
    });
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">
          Your Shopping Cart
        </h1>

        {/* Cart Items */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      className="w-full h-full object-contain"
                      alt={item.name}
                      width={500}
                      height={500}
                    />
                  )}
                </div>

                {/* Product Details */}
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 mt-1">Price: ${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium text-gray-800">
                      {item.inventory}
                    </span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center text-lg col-span-full">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Total and Proceed Button */}
        {cartItems.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Total:</h2>
              <p className="text-2xl font-bold text-blue-600">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleProceed}
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
