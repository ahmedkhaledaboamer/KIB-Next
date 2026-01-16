'use client';

import { X, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useMemo, useEffect } from 'react';
import { cn } from '@/utils/cn';
import Image from 'next/image';

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PopupModal({ isOpen, onClose }: PopupModalProps) {
  const t = useTranslations("popupModal");
  const locale = useLocale();
  const isRTL = useMemo(() => locale === "ar", [locale]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const services = [
    t("services.generalConsultations"),
    t("services.aiResearch"),
    t("services.claimsSettlement"),
    t("services.businessmenServices"),
    t("services.finance"),
    t("services.trade")
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with strong blur effect on entire page */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[9998] transition-opacity"
        onClick={onClose}
        style={{ backdropFilter: 'blur(12px)' }}
      />

      {/* Modal - centered on all screen sizes */}
      <div className={cn(
        "fixed inset-0 z-[9999] flex pointer-events-none",
        "items-center justify-center",
        "p-3 sm:p-4 md:p-4"
      )}>
        <div 
          className={cn(
            "bg-slate-900 shadow-2xl",
            "w-[95vw] h-[90vh] rounded-2xl",
            "sm:w-[90vw] sm:h-[85vh] sm:rounded-3xl",
            "md:w-[70vw] md:h-[75vh]",
            "overflow-hidden",
            "pointer-events-auto relative",
            "flex flex-col"
          )}
          style={{
            maxWidth: '90vw',
            maxHeight: '90vh'
          }}
          onClick={(e) => e.stopPropagation()}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={cn(
              "absolute cursor-pointer rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10",
              "top-3 right-3 sm:top-4 sm:right-4"
            )}
            style={{
              [isRTL ? 'left' : 'right']: 'clamp(0.75rem, 2vw, 1rem)',
              top: 'clamp(0.75rem, 2vw, 1rem)',
              width: 'clamp(2.5rem, 5vw, 2.5rem)',
              height: 'clamp(2.5rem, 5vw, 2.5rem)'
            }}
            aria-label={t("close")}
          >
            <X 
              className="text-white" 
              style={{
                width: 'clamp(1.25rem, 3vw, 1.25rem)',
                height: 'clamp(1.25rem, 3vw, 1.25rem)'
              }}
            />
          </button>

          {/* Content - takes full modal space */}
          <div 
            className="w-full h-full text-center flex flex-col overflow-hidden"
            style={{
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              paddingTop: 'clamp(3rem, 6vh, 2rem)'
            }}
          >
            {/* Logo */}
            <div className="mb-2 flex justify-center flex-shrink-0" style={{ marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
              <div 
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  width: 'clamp(3rem, 12vw, 6.5rem)',
                  height: 'clamp(3rem, 12vw, 6.5rem)'
                }}
              >
                <Image
                  src="/logo.webp"
                  alt="Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 3rem, 6.5rem"
                  priority
                />
              </div>
            </div>

            {/* Title */}
            <h2 
              className="font-bold text-yellow-500 flex-shrink-0"
              style={{
                fontSize: 'clamp(1rem, 4vw, 2rem)',
                marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)'
              }}
            >
              {t("title")}
            </h2>

            {/* Description - takes remaining space */}
            <div className="flex-1 overflow-y-auto min-h-0 flex flex-col justify-between" style={{ gap: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
              <div style={{ gap: 'clamp(0.5rem, 1.5vh, 0.75rem)' }} className="flex flex-col">
                <p 
                  className="text-gray-300 leading-relaxed"
                  style={{ fontSize: 'clamp(0.75rem, 2vw, 1.125rem)' }}
                >
                  {t("description1")}
                </p>

                <p 
                  className="text-gray-300 leading-relaxed"
                  style={{ fontSize: 'clamp(0.75rem, 2vw, 1.125rem)' }}
                >
                  {t("description2")}
                </p>

                <p 
                  className="text-gray-400 italic"
                  style={{ fontSize: 'clamp(0.7rem, 1.75vw, 1rem)' }}
                >
                  {t("description3")}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-700" style={{ margin: 'clamp(0.5rem, 1.5vh, 0.25rem) 0' }} />

              {/* Services Section */}
              <div className="flex-shrink-0">
                <h3 
                  className="font-bold text-white"
                  style={{
                    fontSize: 'clamp(0.875rem, 2.5vw, 1.5rem)',
                    marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)'
                  }}
                >
                  {t("ourGroup")}
                </h3>

                <div 
                  className="grid grid-cols-1 sm:grid-cols-2"
                  style={{
                    gap: 'clamp(0.5rem, 1.5vw, 1rem)',
                    marginBottom: 'clamp(0.5rem, 1.5vh, 0.25rem)'
                  }}
                >
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer border border-gray-700/50"
                      style={{
                        padding: 'clamp(0.5rem, 1.5vw, 1rem)'
                      }}
                    >
                      <p 
                        className="text-gray-300 font-medium leading-tight"
                        style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)' }}
                      >
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-700" style={{ margin: 'clamp(0.5rem, 1.5vh, 0.5rem) 0' }} />

              {/* Social Media */}
              <div className="flex-shrink-0">
                <h4 
                  className="font-semibold text-white"
                  style={{
                    fontSize: 'clamp(0.75rem, 2vw, 1.125rem)',
                    marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)'
                  }}
                >
                  {t("followUs")}
                </h4>

                <div 
                  className="flex justify-center"
                  style={{ gap: 'clamp(0.5rem, 1.5vw, 1rem)' }}
                >
                  <a 
                    href="#" 
                    className="rounded-full bg-white/10 hover:bg-yellow-600 flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      width: 'clamp(2.5rem, 5vw, 3.5rem)',
                      height: 'clamp(2.5rem, 5vw, 3.5rem)'
                    }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin 
                      className="text-white"
                      style={{ width: 'clamp(1.25rem, 2.5vw, 1.75rem)', height: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                    />
                  </a>
                  <a 
                    href="#" 
                    className="rounded-full bg-white/10 hover:bg-yellow-600 flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      width: 'clamp(2.5rem, 5vw, 3.5rem)',
                      height: 'clamp(2.5rem, 5vw, 3.5rem)'
                    }}
                    aria-label="Twitter"
                  >
                    <svg 
                      className="text-white" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      style={{ width: 'clamp(1.25rem, 2.5vw, 1.75rem)', height: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="rounded-full bg-white/10 hover:bg-yellow-600 flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      width: 'clamp(2.5rem, 5vw, 3.5rem)',
                      height: 'clamp(2.5rem, 5vw, 3.5rem)'
                    }}
                    aria-label="Instagram"
                  >
                    <Instagram 
                      className="text-white"
                      style={{ width: 'clamp(1.25rem, 2.5vw, 1.75rem)', height: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                    />
                  </a>
                  <a 
                    href="#" 
                    className="rounded-full bg-white/10 hover:bg-yellow-600 flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      width: 'clamp(2.5rem, 5vw, 3.5rem)',
                      height: 'clamp(2.5rem, 5vw, 3.5rem)'
                    }}
                    aria-label="Facebook"
                  >
                    <Facebook 
                      className="text-white"
                      style={{ width: 'clamp(1.25rem, 2.5vw, 1.75rem)', height: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

