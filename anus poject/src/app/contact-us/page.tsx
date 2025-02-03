'use client'; // This tells Next.js that this is a client-side component

import { useState } from 'react';
import Image from 'next/image';
import Header from '../components/Header'; // Assuming Header is a component you've created
import Footer from '../components/Footer'; // Assuming Footer is a component you've created

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add form submission logic here, e.g., send to an API or email.
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your message has been sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="w-full bg-gray-50">
        {/* Header Section */}
        <div className="bg-gray-200 py-8">
          <div className="max-w-[1200px] mx-auto px-4">
            <h1 className="text-3xl font-bold text-[#101750] mb-2">Contact Us</h1>
            <p className="text-sm text-black">
              Home <span className="text-black">.</span> Pages <span className="text-black">.</span>{" "}
              <span className="text-[#FB2E86]">Contact Us</span>
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-wrap gap-12">
          {/* Left Section */}
          <div className="flex-1">
            {/* Information About Us */}
            <h2 className="text-2xl font-bold text-[#151875] mb-4">Information About Us</h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est.
            </p>
            <div className="flex gap-2 mb-8">
              <span className="w-3 h-3 rounded-full bg-[#5625DF]"></span>
              <span className="w-3 h-3 rounded-full bg-[#FF27B7]"></span>
              <span className="w-3 h-3 rounded-full bg-[#37DAF3]"></span>
            </div>

            {/* Get in Touch */}
            <h2 className="text-2xl font-bold text-[#151875] mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices tristique amet erat vitae eget dolor.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name*"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 outline-none text-sm"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your E-mail*"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 outline-none text-sm"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject*"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 outline-none text-sm"
                required
              />
              <textarea
                name="message"
                placeholder="Type your message*"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md p-3 outline-none text-sm"
                required
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FB2E86] text-white py-3 px-8 rounded-md hover:bg-[#F94C9B] transition-colors"
              >
                {isSubmitting ? 'Sending...' : 'Send Mail'}
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex-1">
            {/* Contact Way */}
            <h2 className="text-2xl font-bold text-[#151875] mb-8">Contact Way</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 rounded-full bg-[#5726DF]"></span>
                <div className="text-gray-600">
                  <p>
                    Tel: <a href="tel:877678899" className="text-[#FB2E86]">877-67-88-99</a>
                  </p>
                  <p>
                    E-Mail: <a href="mailto:shop@store.com" className="text-[#FB2E86]">shop@store.com</a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 rounded-full bg-[#FB2E86]"></span>
                <div className="text-gray-600">
                  <p>Support Forum</p>
                  <p>For over 24hr</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 rounded-full bg-[#FFB265]"></span>
                <div className="text-gray-600">
                  <p>20 Margaret st, London</p>
                  <p>Great Britain, 3NM98-LK</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 rounded-full bg-[#1BE982]"></span>
                <div className="text-gray-600">
                  <p>Free standard shipping</p>
                  <p>on all orders</p>
                </div>
              </div>
            </div>

            <div>
              <Image
                src="/images/connect.png" // Reference the image using its path in the public folder
                alt="Contact us"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
