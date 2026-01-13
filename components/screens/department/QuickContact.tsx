'use client';

import { Phone, MessageCircle } from 'lucide-react';

const contacts = [
  {
    label: 'Call',
    href: 'tel:+971501234567',
    icon: Phone,
    isExternal: false,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/971501234567',
    icon: MessageCircle,
    isExternal: true,
  },
];

export default function QuickContact() {
  return (
    <section id="departments-section" className="w-full bg-cyan-400 flex items-center justify-between px-[5%] py-[1%] ">
      <h2 className="text-white font-bold text-[clamp(1.5rem,4vw,4rem)] ">
        The Digital Director
      </h2>

      <div className="flex gap-[clamp(1rem,3vw,2rem)] items-center text-white font-semibold text-[clamp(1.25rem,2.5vw,2rem)]">
        {contacts.map(({ label, href, icon: Icon, isExternal }) => (
          <a
            key={label}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-2 hover:text-gray-100 transition-colors"
          >
            <Icon className="w-[clamp(1.5rem,3vw,3rem)] h-[clamp(1.5rem,3vw,3rem)]" />
             
          </a>
        ))}
      </div>
    </section>
  );
}
