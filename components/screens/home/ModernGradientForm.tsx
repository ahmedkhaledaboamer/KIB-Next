'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Mail,
  Phone,
  User,
  Briefcase,
  MessageSquare,
  Send,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  MailIcon,
  PhoneIcon,
  Twitch,
} from 'lucide-react';

export default function VIPContactForm() {
  const t = useTranslations('vipForm');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clientType: 'VIP',
    reason: '',
    notes: '',
  });

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
    alert(t('successMessage'));
  };

  return (
    <section className="min-h-screen  p-[5%] ">
      <div className="bg-[#181f29] p-[5%] rounded-2xl ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,5vw,4rem)] items-center">
          
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/man1.webp"
                alt="VIP Services"
                className="w-full h-full object-cover"
              />
            </div>

            <h1
              className="text-[#fd9908] text-center mt-[clamp(0.5rem,1vw,2rem)] font-bold mb-3"
              style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}
            >
              {t('title')}
            </h1>

            <p
              className="text-gray-200 text-center"
              style={{ fontSize: 'clamp(1rem,1.6vw,2rem)' }}
            >
              {t('subtitle')}
            </p>

            <div className="flex justify-center gap-4 mt-[clamp(2rem,4vw,3rem)]">
              <SocialIcon><MailIcon /></SocialIcon>
              <SocialIcon><PhoneIcon /></SocialIcon>
              <SocialIcon><Twitch /></SocialIcon>
            </div>
            
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] shadow-xl">
            <div className="space-y-[clamp(1rem,2vw,1.4rem)]">

              <Input icon={<User />} placeholder={t('fields.name')} value={formData.name} onChange={(v: string) => handleChange('name', v)} />
              <Input icon={<Mail />} placeholder={t('fields.email')} value={formData.email} onChange={(v: string) => handleChange('email', v)} />
              <Input icon={<Phone />} placeholder={t('fields.phone')} value={formData.phone} onChange={(v: string) => handleChange('phone', v)} />

              <label
                className="block font-semibold text-black mb-2"
                style={{ fontSize: 'clamp(0.875rem, 2vw, 2rem)' }}
              >
                {t('fields.clientType')}
              </label>

              <div className="relative">
                <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <select
                  value={formData.clientType}
                  onChange={(e) => handleChange('clientType', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl py-3 pr-12 pl-4 text-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="VIP">{t('clientTypes.vip')}</option>
                  <option value="Enterprise">{t('clientTypes.entrepreneur')}</option>
                  <option value="Investor">{t('clientTypes.investor')}</option>
                  <option value="Institution">{t('clientTypes.institution')}</option>
                  <option value="Partner">{t('clientTypes.partner')}</option>
                  <option value="Consultant">{t('clientTypes.consultant')}</option>
                </select>
              </div>

              <Textarea
                icon={<MessageSquare />}
                placeholder={t('fields.reason')}
                value={formData.reason}
                onChange={(v: string) => handleChange('reason', v)}
                rows={3}
              />

              <Textarea
                placeholder={t('fields.notes')}
                value={formData.notes}
                onChange={(v: string) => handleChange('notes', v)}
                rows={4}
              />

              <button
                onClick={handleSubmit}
                className="w-full bg-[#181f29]  cursor-pointer hover:bg-gray-800 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition"
                style={{ fontSize: 'clamp(0.95rem,1.5vw,1.5rem)' }}
              >
                <Send className="w-5 h-5" />
                {t('submitButton')}
              </button>
            </div>

            <p className="text-center text-gray-600 mt-6 "  style={{ fontSize: 'clamp(0.95rem,1.5vw,1.5rem)' }}>
              {t('privacyNote')}
            </p>

            <div className="flex justify-center gap-4 mt-[clamp(2rem,4vw,3rem)]">
              <SocialIcon><Linkedin /></SocialIcon>
              <SocialIcon><Twitter /></SocialIcon>
              <SocialIcon><Instagram /></SocialIcon>
              <SocialIcon><Facebook /></SocialIcon>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Components ---------- */

function Input({ icon, placeholder, value, onChange }: any) {
  return (
    <div className="relative">
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
        {icon}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-300 rounded-xl py-3 pr-12 pl-4 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

function Textarea({ icon, placeholder, value, onChange, rows }: any) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute right-4 top-4 text-gray-500">
          {icon}
        </div>
      )}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-300 rounded-xl py-3 pr-12 pl-4 text-black placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-12 h-12 rounded-full border border-gray-300 bg-white hover:bg-[#fd9908]  hover:border-none hover:text-white flex items-center justify-center transition cursor-pointer text-black">
      {children}
    </div>
  );
}
