"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import React, { useState, useEffect } from "react";

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  searchTerm?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages = 5,
  currentPage: externalCurrentPage,
  onPageChange,
  searchTerm = "",
}) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = externalCurrentPage ?? internalCurrentPage;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync with external page
  useEffect(() => {
    if (externalCurrentPage !== undefined) setInternalCurrentPage(externalCurrentPage);
  }, [externalCurrentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      if (externalCurrentPage === undefined) setInternalCurrentPage(page);
      
      // Update URL if onPageChange is not provided (SSR mode)
      if (!onPageChange) {
        const params = new URLSearchParams();
        if (searchTerm.trim()) {
          params.set("search", searchTerm.trim());
        }
        if (page > 1) {
          params.set("page", page.toString());
        }
        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.replace(newUrl);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        onPageChange(page);
      }
    }
  };

  const handlePrevious = () => handlePageChange(currentPage - 1);
  const handleNext = () => handlePageChange(currentPage + 1);

  // Responsive: number of visible pages
  const getVisiblePages = () => {
    if (windowWidth <= 320) return 3;
    if (windowWidth < 640) return 4;
    if (windowWidth < 1024) return 5;
    return Math.min(7, totalPages);
  };

  const getPageNumbers = (): (number | string)[] => {
    const visiblePages = getVisiblePages();
    if (totalPages <= visiblePages) return Array.from({ length: totalPages }, (_, i) => i + 1);

    let startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages - 1) {
      endPage = totalPages - 1;
      startPage = Math.max(2, endPage - visiblePages + 1);
    }

    const pages: (number | string)[] = [1];
    if (startPage > 2) pages.push("...");
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (endPage < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  const getButtonSize = () => {
    if (windowWidth <= 320) return "w-8 h-8 text-xs";
    if (windowWidth < 640) return "w-9 h-9 text-sm";
    if (windowWidth < 768) return "w-10 h-10";
    return "w-11 h-11";
  };

  const buttonSizeClass = getButtonSize();
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-4 px-2">
      <div className="flex flex-wrap justify-center gap-2">
        {/* Previous */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`${buttonSizeClass} rounded-lg flex items-center justify-center font-semibold transition ${
            currentPage === 1
              ? "bg-[#0d8d82] text-white/50 cursor-not-allowed"
              : "bg-[#0d8d82] text-white hover:bg-[#3ec9bb]"
          }`}
        >
          ‹
        </button>

        {/* Pages */}
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className={`${buttonSizeClass} flex items-center justify-center text-gray-500`}
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className={`${buttonSizeClass} rounded-lg font-semibold transition ${
                currentPage === page
                  ? "bg-[#0d8d82] text-white"
                  : "border border-[#0d8d82] text-[#0d8d82] hover:bg-[#0d8d82] hover:text-white"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`${buttonSizeClass} rounded-lg flex items-center justify-center font-semibold transition ${
            currentPage === totalPages
              ? "bg-[#12b3a6] text-white/50 cursor-not-allowed"
              : "bg-[#12b3a6] text-white hover:bg-[#3ec9bb]"
          }`}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;
