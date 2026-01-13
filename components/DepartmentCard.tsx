'use client';

import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export default function DepartmentCard({
  member,
}: {
  member: {
    name: string;
    position: string;
    description: string;
    image: string;
    email: string;
    phone: string;  
    location: string;
  };
}) {
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-white/30 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 ">
      
      {/* Image */}
      <div className="relative h-[clamp(400px,40vw,600px)] overflow-hidden rounded-3xl">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Info */}
        <div className="absolute bottom-0 p-[clamp(1rem,3vw,3rem)] text-white z-10 w-full">
          {/* Position / Title */}
          <h3 className="font-bold mb-2" style={{ fontSize: 'clamp(1.5rem, 2vw, 5rem)' }}>
            {member.position}
          </h3>

          {/* Description */}
          <p className="text-gray-200 mb-4 leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 2rem)' }}>
            {member.description}
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-wrap gap-[clamp(0.5rem,1.5vw,1rem)] mt-2">
            {/* Email */}
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 px-[clamp(0.5rem,1vw,1rem)] py-[clamp(0.25rem,0.8vw,0.75rem)] rounded-full bg-white/10 backdrop-blur-md font-medium
                         hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500
                         hover:text-white shadow-md hover:shadow-cyan-500/50
                         transform hover:-translate-y-1 hover:scale-105
                         transition-all duration-300 ease-in-out"
              style={{ fontSize: 'clamp(0.75rem,1.2vw,1.5rem)' }}
            >
              <Mail className="w-[clamp(0.75rem,1.2vw,1.5rem)] h-[clamp(0.75rem,1.2vw,1.5rem)] text-cyan-400 group-hover:text-white transition-colors duration-300" />
              Email
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${member.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-[clamp(0.5rem,1vw,1rem)] py-[clamp(0.25rem,0.8vw,0.75rem)] rounded-full bg-white/10 backdrop-blur-md font-medium
                         hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600
                         hover:text-white shadow-md hover:shadow-green-500/50
                         transform hover:-translate-y-1 hover:scale-105
                         transition-all duration-300 ease-in-out"
              style={{ fontSize: 'clamp(0.75rem,1.2vw,1.5rem)' }}
            >
              <Phone className="w-[clamp(0.75rem,1.2vw,1.5rem)] h-[clamp(0.75rem,1.2vw,1.5rem)] text-green-400 group-hover:text-white transition-colors duration-300" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
