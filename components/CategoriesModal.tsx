"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import CardDetails from "./CardDetails";
import { Iservices } from "./screens/home/ServicesShowcase";

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Iservices;
}

export default function CategoriesModal({
  isOpen,
  onClose,
  service,
}: CategoriesModalProps) {
  const subservices = service.subservices || [];
  const modalRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("categoriesModal");
  const tServices = useTranslations("services");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-white/20 backdrop-blur-md">
      <div
        ref={modalRef}
        className="
          relative w-full
          max-w-[clamp(20rem,90vw,90rem)]
          max-h-[clamp(80vh,90vh,95vh)]
          bg-white
          rounded-3xl
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          flex flex-col
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="relative flex items-center justify-between px-[clamp(1rem,3vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] ">
          {/* Accent Line */}
          <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#0d8d82] to-[#12b3a6]" />

          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-900">
            {service.title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close"
            className="
              p-2 rounded-full
              hover:bg-gray-100
              transition cursor-pointer
            "
          >
            <X className="w-6 h-6 text-[#0d8d82]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-[clamp(1rem,3vw,2.5rem)] py-[clamp(1.5rem,3vw,3rem)]">
          {subservices.length > 0 ? (
            <div
              className="
                grid gap-[clamp(1rem,2vw,2rem)]
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {subservices.map((subservice) => (
                <CardDetails
                  key={subservice.id}
                  link="/book"
                  btn={tServices("bookButton")}
                  service={subservice}
                  disableModal
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-16 text-lg">
              {t("noSubServices")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
