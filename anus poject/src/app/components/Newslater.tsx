'use client';
import Link from 'next/link';
import Image from 'next/image';

function Newslater() {
  return (
    <div className="w-full bg-white">
      {/* Newsletter Section */}
      <div
        className="w-full bg-cover bg-center py-20"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <div className="max-w-screen-xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#151875] mb-6">
            Get the Latest Updates by Subscribing to Our Newsletter
          </h2>

          <Link href="/shoplist">
            <button className="bg-[#FB2E86] text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-[#F94C9B] transition-colors">
              Subscribe Now
            </button>
          </Link>
        </div>
      </div>

      {/* Logos Section */}
      <div className="w-full py-12">
        <div className="max-w-screen-xl mx-auto flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Company Logos" // More descriptive alt text
            width={800} // Adjust as per your design
            height={100} // Adjust as per your design
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Newslater;
