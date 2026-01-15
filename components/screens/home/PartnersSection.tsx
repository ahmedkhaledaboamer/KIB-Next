'use client';

import { useEffect, useRef } from 'react';

interface Partner {
  name: string;
  logo: string;
 }

const partners: Partner[] = [
  { name: 'TSE', logo: 'tse' },
  { name: 'Monceau', logo: 'monceau' },
  { name: 'Coudac', logo: 'coudac' },
  { name: 'Fiomodia', logo: 'fiomodia' },
  { name: 'Weglot', logo: 'weglot'},
  { name: 'Influence', logo: 'influence' },
];

export default function PartnersSection() {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll1 = scrollRef1.current;
    const scroll2 = scrollRef2.current;

    if (!scroll1 || !scroll2) return;

    let animationId1: number;
    let animationId2: number;
    let scrollPos1 = 0;
    let scrollPos2 = 0;

    const animate1 = () => {
      scrollPos1 += 0.5;
      if (scroll1.scrollLeft >= scroll1.scrollWidth / 3) {
        scrollPos1 = 0;
      }
      scroll1.scrollLeft = scrollPos1;
      animationId1 = requestAnimationFrame(animate1);
    };

    const animate2 = () => {
      scrollPos2 -= 0.5;
      if (scrollPos2 <= 0) {
        scrollPos2 = scroll2.scrollWidth / 3;
        scroll2.scrollLeft = scrollPos2;
      }
      scroll2.scrollLeft = scrollPos2;
      animationId2 = requestAnimationFrame(animate2);
    };

    // Initialize second scroll position
    scroll2.scrollLeft = scroll2.scrollWidth / 3;

    animationId1 = requestAnimationFrame(animate1);
    animationId2 = requestAnimationFrame(animate2);

    return () => {
      cancelAnimationFrame(animationId1);
      cancelAnimationFrame(animationId2);
    };
  }, []);

  return (
    <div className="bg-[#ecf0f0] py-[5%]   overflow-hidden">
      <div className=" mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
             <span className="text-5xl font-bold uppercase tracking-wide  font-semibold" style={{ color: '#FD9908' }}>
            Areas of Practice
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: '#181d27' }}>
          Expert representation across fields. Decades of excellence commitment.


          </h2>
          
          
        </div>

        {/* Partners Slider - Row 1 */}
        <div 
          ref={scrollRef1}
          className="overflow-x-hidden mb-8 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-5 w-max">
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <PartnerCard key={`row1-${index}`} name={partner.name} logo={partner.logo}   />
            ))}
          </div>
        </div>

        {/* Partners Slider - Row 2 */}
        <div 
          ref={scrollRef2}
          className="overflow-x-hidden scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-5 w-max">
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <PartnerCard key={`row2-${index}`} name={partner.name} logo={partner.logo}   />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface PartnerCardProps {
  name: string;
  logo: string;
   
}

function PartnerCard({ name, logo }: PartnerCardProps) {
  return (
    <div className="group relative h-52 w-72 cursor-pointer flex-shrink-0">
      {/* Default Square Card with Icon */}
      <div className="absolute inset-0 backdrop-blur-sm rounded-2xl transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 flex flex-col items-center justify-center gap-3 shadow-lg" style={{ backgroundColor: '#ffffff' }}>
        {/* Icon */}
        <div className="w-18 h-18 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ecf0f0' }}>
                      <svg className="w-12 h-12 text-[#181d27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        {/* Name */}
        <span className="text-5xl font-semibold text-[#181d27]">{name}</span>
      </div>
      
      {/* Hover Card with Background Image */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl">
        <div 
          className="w-full h-full backdrop-blur-sm flex items-center justify-center relative" 
          style={{ 
            backgroundImage:  `url("https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=400&fit=crop)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
           }}
        >
          {/* Dark Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
          
          {/* Logo/Name at center */}
          <div className="text-center z-10">
            <span className="text-3xl font-bold text-white drop-shadow-lg">
              {name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}