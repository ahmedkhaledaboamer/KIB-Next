"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ISearchBarProps {
  initialValue?: string;
  onClear?: () => void;
  onSearch?: (searchTerm: string) => void;
  debounceDelay?: number;
}

const SearchBar = ({ initialValue = "", onClear, debounceDelay = 500 }: ISearchBarProps) => {
  const t = useTranslations("services");
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const { debouncedValue, clearDebounce } = useDebounce(searchTerm, debounceDelay);
  const router = useRouter();
  const pathname = usePathname();

  // Sync with initial value prop
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  // Update URL when debounced value changes
  useEffect(() => {
    if (debouncedValue !== undefined) {
      const params = new URLSearchParams();
      if (debouncedValue.trim()) {
        params.set("search", debouncedValue.trim());
      }
      // Reset to page 1 when searching
      params.set("page", "1");

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedValue, pathname, router]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear debounce and update URL immediately
    clearDebounce();
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }
    params.set("page", "1");
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    clearDebounce();
    router.replace(pathname);
    onClear?.();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Don't clear debounce here - let it work naturally
  };

  return (
    <div className="mb-[clamp(2rem,4vw,4rem)]">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full max-w-full flex items-center gap-2 sm:gap-3 bg-white rounded-xl shadow-md p-2"
      >
        {/* Search Icon */}
        <div className="absolute text-gray-400 left-3 sm:left-5 flex items-center justify-center h-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder={t?.("searchPlaceholder") || "Search services..."}
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 pl-10 sm:pl-12 pr-28 sm:pr-32 py-[clamp(0.75rem,1.5vw,1.25rem)] text-gray-900 rounded-xl w-full focus:outline-none"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          }}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-20 sm:right-28 text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="absolute right-5 sm:right-2 cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-linear-to-r from-[#0d8d82] to-[#12b3a6] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all text-sm sm:text-base"
        >
          {t?.("searchButton") || "Search"}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
