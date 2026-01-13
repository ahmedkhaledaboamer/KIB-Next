'use client';

import { useEffect, useState, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import CardDetails from "@/components/CardDetails";
import CardDetailsSkeleton from "@/components/CardDetailsSkeleton";
import Pagination from "@/components/Pagination";
import { useServicesStore } from "@/store/useServicesStore";
import { Iservices } from "@/components/screens/home/ServicesShowcase";
import { useSearchParams, useRouter } from 'next/navigation';
 
export default function ServicesPage() {
  const { services, getServices } = useServicesStore();
  const locale = useLocale();  
  const t = useTranslations("services");
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasSent = useRef(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => { 
    getServices(); 
  }, [getServices]);
  useEffect(() => {
    if (hasSent.current) return;

    const sessionId = searchParams.get('session_id');
    if (!sessionId) return;

    const storedData = localStorage.getItem('bookingData');
    if (!storedData) return;

    const bookingData = JSON.parse(storedData);

    const dataToSend = {
      ...bookingData,
      isPaid: true,
      session_id: sessionId,
    };

    const sendBooking = async () => {
      try {
        await fetch('https://shazmlc.cloud/webhook/web-services-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        localStorage.removeItem('bookingData');
        hasSent.current = true;

         router.replace('/services');
      } catch (err) {
        console.error('Booking error:', err);
      }
    };

    sendBooking();
  }, [searchParams, router]);



  
  const filteredServices = useMemo(() => {
    if (!Array.isArray(services)) return [];
    return services.filter((service: Iservices) =>
      service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  const isLoading = !Array.isArray(services) || services.length === 0;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => { 
    setCurrentPage(1); 
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
    setCurrentPage(1); 
  };
  const handleClearSearch = () => { 
    setSearchTerm(""); 
    setCurrentPage(1); 
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-[5%] pt-[calc(5%+80px)]">

      
      {/* Design 2: Split Text with Reveal Effect */}
      <div className="relative text-center space-y-8 mb-24">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-2xl rounded-3xl animate-pulse" />
          
          <h2 className="relative text-[clamp(2.5rem,6vw,7rem)] font-black leading-tight">
             
            <span className="block bg-gradient-to-r from-cyan-500 via-[#005e57] to-[#06332f] bg-clip-text text-transparent">
            {t("title") || "Our Services"} 
            </span>
          </h2>
        </div>        

        <p className="text-[clamp(1.25rem,2.5vw,24rem)] max-w-[70%] text-gray-700  mx-auto leading-relaxed font-light">
        {t("subtitle") || "Explore the range of services we offer to help you succeed."}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-[clamp(2rem,4vw,4rem)]">
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-full flex items-center gap-2 sm:gap-3 bg-white rounded-xl shadow-md p-2">
          
          {/* Search Icon */}
          <div className="absolute text-gray-400 left-3 sm:left-5 flex items-center justify-center h-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Input */}
          <input
  type="text"
  placeholder={t("searchPlaceholder") || "Search services..."}
  value={searchTerm}
  onChange={handleSearchChange}
  className="flex-1 pl-10 sm:pl-12 pr-28 sm:pr-32 py-[clamp(0.75rem,1.5vw,1.25rem)] text-gray-900 rounded-xl w-full focus:outline-none"
  style={{
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',           
   
  }}
/>


          {/* Clear Button */}
          {searchTerm && (
            <button type="button" onClick={handleClearSearch} className="absolute right-20 sm:right-28 text-gray-400 hover:text-gray-600 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Submit Button */}
          <button type="submit" className="absolute right-5 sm:right-2 cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-[#0d8d82] to-[#12b3a6] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all text-sm sm:text-base">
            {t("searchButton") || "Search"}
          </button>
        </form>

        {/* Result Message */}
        {searchTerm && (
          <div className="mt-3 text-center text-sm text-gray-500">
            {filteredServices.length === 0 ? t("noResults") || "No services found"
              : `${filteredServices.length} ${t("resultsFound") || "results found"}`}
          </div>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-[clamp(1rem,2vw,3rem)] mb-8">
        {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, i) => <CardDetailsSkeleton key={i} />)
          : currentServices.length > 0
            ? currentServices.map((service: Iservices) => (
                <CardDetails key={service.id} btn={t("bookButton") || "Book Now"} link={`/${locale}/booking`} service={service} />
              ))
            : !isLoading && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-xl">{t("noServices") || "No services available"}</p>
                </div>
              )
        }
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-[clamp(2rem,4vw,5rem)]">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      )}

      {isLoading && (
        <p className="text-center text-gray-500 mt-[clamp(2rem,4vw,5rem)]">{t("loading") || "Loading services..."}</p>
      )}
    </div>
  );
}