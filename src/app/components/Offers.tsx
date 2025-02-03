'use client';

import Image from 'next/image';

function Offer() {
  const offers = [
    { id: 1, icon: '/images/icon1.png', title: '24/7 Support', description: 'Our team is available 24/7 to assist you with any questions or issues.' },
    { id: 2, icon: '/images/icon2.png', title: 'Free Shipping', description: 'Enjoy free shipping on all orders over $50, delivered right to your door.' },
    { id: 3, icon: '/images/icon3.png', title: 'Money-Back Guarantee', description: 'If you are not satisfied with your purchase, we offer a 30-day money-back guarantee.' },
    { id: 4, icon: '/images/icon4.png', title: 'Secure Payments', description: 'We ensure your payments are safe with top-tier security protocols.' },
  ];

  return (
    <div className="w-full bg-white py-20">
      {/* Section Heading */}
      <h2 className="text-[#3F509E] text-4xl font-bold text-center mb-12">What Shopex Offers!</h2>

      {/* Offer Boxes */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col items-center text-center border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Icon */}
            <div className="w-16 h-16 mb-4">
              <Image src={offer.icon} alt={offer.title} width={64} height={64} className="object-contain" />
            </div>
            {/* Heading */}
            <h3 className="text-[#3F509E] font-bold text-lg mb-2">{offer.title}</h3>
            {/* Description */}
            <p className="text-gray-600 text-sm">{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offer;
