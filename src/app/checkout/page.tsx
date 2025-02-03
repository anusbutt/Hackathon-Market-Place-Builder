"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCartItems } from "@/app/actions/actions";
import Link from "next/link";
import { Product } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import Swal from "sweetalert2";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.inventory,
    0
  );
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      // Clear applied discount after successful form validation
      localStorage.removeItem("appliedDiscount");

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, place order!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("cart");
          setCartItems([]);
          Swal.fire(
            "Order Placed!",
            "Your order has been placed successfully.",
            "success"
          );
        }
      });
    } else {
      // If form is invalid
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the required fields.",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
        {/* Breadcrumb */}
        <div className="pt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2">
              <Link
                href="/cart"
                className="text-gray-600 hover:text-gray-900 transition text-sm flex items-center gap-1"
              >
                <AiOutlineShoppingCart className="w-4 h-4" /> Cart
              </Link>
              <CgChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">
                Checkout
              </span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Order Summary
              </h2>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 py-4 border-b last:border-b-0"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                      {item.image && (
                        <Image
                          src={urlFor(item.image).url()}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.inventory}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${item.price * item.inventory}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Your cart is empty.</p>
              )}
              <div className="space-y-3 pt-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${subtotal}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Discount</p>
                  <p className="text-sm font-medium text-red-500">
                    -${discount}
                  </p>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <p className="text-lg font-semibold text-gray-900">Total</p>
                  <p className="text-lg font-semibold text-blue-600">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Billing Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Billing Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    placeholder="Enter your first name"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  {formErrors.firstName && (
                    <p className="text-sm text-red-500 mt-1">
                      First name is required.
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    placeholder="Enter your last name"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  {formErrors.lastName && (
                    <p className="text-sm text-red-500 mt-1">
                      Last name is required.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  id="address"
                  placeholder="Enter your address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                {formErrors.address && (
                  <p className="text-sm text-red-500 mt-1">
                    Address is required.
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    placeholder="Enter your city"
                    value={formValues.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  {formErrors.city && (
                    <p className="text-sm text-red-500 mt-1">
                      City is required.
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Zip Code
                  </label>
                  <input
                    id="zipCode"
                    placeholder="Enter your zip code"
                    value={formValues.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  {formErrors.zipCode && (
                    <p className="text-sm text-red-500 mt-1">
                      Zip Code is required.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                {formErrors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    Phone is required.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  placeholder="Enter your email address"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    Email is required.
                  </p>
                )}
              </div>
              <button
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
