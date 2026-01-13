import CardDetails from "@/components/CardDetails";
import CardDetailsSkeleton from "@/components/CardDetailsSkeleton";
import Pagination from "@/components/Pagination";
import { Iservices } from "@/components/screens/home/ServicesShowcase";
import SearchBar from "@/components/screens/services/SearchBar";

import { getServices, isLoading } from "@/utils/getServices";
import { getLocale, getTranslations } from "next-intl/server";

const ITEMS_PER_PAGE = 12;
// https://shazmlc.cloud/webhook/web-services-booking
export default async function ServicesPage({
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const services = await getServices();
  const locale = await getLocale();
  const t = await getTranslations("services");
  const searchParamsData = await searchParams;

  // Read search and page from URL params
  const searchTerm = typeof searchParamsData.search === "string" ? searchParamsData.search : "";
  const currentPage =
    typeof searchParamsData.page === "string"
      ? Math.max(1, parseInt(searchParamsData.page, 10) || 1)
      : 1;

  // Filter services based on search term
  const filteredServices = services.filter((service: Iservices) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      service.title?.toLowerCase().includes(searchLower) ||
      service.description?.toLowerCase().includes(searchLower)
    );
  });

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredServices.length / ITEMS_PER_PAGE));
  // Ensure currentPage is within valid range (clamp to valid range)
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const sessionId = await searchParamsData["session_id"];

  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  if (sessionId) {
    // TODO ADD Your Function Here To Handle the session_id
    console.log("session_id: ", sessionId);
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-[5%] pt-[calc(5%+80px)]">
      {/* Design 2: Split Text with Reveal Effect */}
      <div className="relative text-center space-y-8 mb-24">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-linear-to-r from-cyan-500/20 to-blue-500/20 blur-2xl rounded-3xl animate-pulse" />

          <h2 className="relative text-[clamp(2.5rem,6vw,7rem)] font-black leading-tight">
            <span className="block bg-linear-to-r from-cyan-500 via-[#005e57] to-[#06332f] bg-clip-text text-transparent">
              {t("title") || "Our Services"}
            </span>
          </h2>
        </div>

        <p className="text-[clamp(1.25rem,2.5vw,24rem)] max-w-[70%] text-gray-700  mx-auto leading-relaxed font-light">
          {t("subtitle") || "Explore the range of services we offer to help you succeed."}
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar initialValue={searchTerm} debounceDelay={150} />
      {/* Result Message */}
      <div className="mt-3 text-center text-sm text-gray-500">
        {searchTerm ? (
          filteredServices.length === 0 ? (
            t("noResults") || "No services found"
          ) : (
            `${filteredServices.length} ${t("resultsFound") || "results found"}`
          )
        ) : totalPages > 1 ? (
          <>
            {t("showing") || "Showing"} {startIndex + 1}-
            {Math.min(endIndex, filteredServices.length)} {t("of") || "of"}{" "}
            {filteredServices.length} {t("services") || "services"}
          </>
        ) : (
          `${filteredServices.length} ${t("services") || "services"}`
        )}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-[clamp(1rem,2vw,3rem)] mb-8">
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <CardDetailsSkeleton key={i} />)
          : currentServices.length > 0
          ? currentServices.map((service: Iservices) => (
              <CardDetails
                key={service.id}
                btn={t("bookButton") || "Book Now"}
                link={`/${locale}/booking`}
                service={service}
              />
            ))
          : !isLoading && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-xl">
                  {t("noServices") || "No services available"}
                </p>
              </div>
            )}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-[clamp(2rem,4vw,5rem)]">
          <Pagination
            totalPages={totalPages}
            currentPage={validCurrentPage}
            searchTerm={searchTerm}
          />
        </div>
      )}

      {isLoading && (
        <p className="text-center text-gray-500 mt-[clamp(2rem,4vw,5rem)]">
          {t("loading") || "Loading services..."}
        </p>
      )}
    </div>
  );
}
