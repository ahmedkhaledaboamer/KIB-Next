'use client';

import Button from '@/components/button';
 import { CheckCircle, Phone } from 'lucide-react';

export default function LegalCTASection() {
  return (
    <section
    className="
      relative overflow-hidden
     p-[5%]
      bg-no-repeat bg-right
      bg-cover lg:bg-contain
    "
    style={{
      backgroundImage: "url('/images/banner.webp')",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-white/20" />

    {/* Content Wrapper */}
    <div className="relative z-10   mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10 lg:p-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div className="space-y-6 sm:space-y-8">

          {/* Title */}
          <div className="space-y-2">
            <h2
              className="font-bold text-gray-900 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 5rem)' }}
            >
              Ready to Experience
            </h2>

            <h3
              className="font-bold bg-gradient-to-r from-yellow-500 via-green-500 to-cyan-500 bg-clip-text text-transparent leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 6rem)' }}
            >
              Gold-Standard Legal Excellence?
            </h3>
          </div>

          {/* Description */}
          <p
            className="text-gray-700  "
            style={{ fontSize: 'clamp(1rem, 2vw, 3rem)' }}
          >
            Get personalized legal solutions today. Our expert team is ready to guide you through every step.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-4">
            {['Free Consultation', '24/7 Support', 'Confidential'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-10 h-10  bg-yellow-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6     text-white" />
                </div>
                <span className="font-semibold text-gray-800   " style={{ fontSize: 'clamp(1rem, 3vw, 2.5rem)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          
          <div
  className="flex flex-row items-center justify-center lg:justify-start flex-wrap gap-[clamp(1rem,1.5vw,2rem)]"
>
  <Button variant="yellow" size="sm" className="font-extrabold">
  Book Consultation
  </Button>
  <Button variant="dark" size="sm" className="font-extrabold">
  Call Now
  </Button>
</div>
        </div>

      </div>
    </div>
  </section>
  );
}