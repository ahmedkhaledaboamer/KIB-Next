import Button from "@/components/button";
import CardDetails from "@/components/CardDetails";
import CardDetailsSkeleton from "@/components/CardDetailsSkeleton";
import { getServices, isLoading } from "@/utils/getServices";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

export interface Iservices {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  paymentLink: string;
  image: string;
  subservices: Iservices[];
}

export default async function ServicesShowcase() {
  // Server-side locale & translations
  const locale = await getLocale();
  const t = await getTranslations("services");

  // Fetch services
  const services = await getServices();
  const displayedServices = Array.isArray(services)
  ? services.slice(0, 8)
  : [];
  return (
    <section
      className="
        min-h-screen 
        bg-gray-100
        px-[clamp(1rem,5vw,6rem)]
        py-[clamp(2rem,6vw,6rem)]
        max-w-fall
        mx-auto
      "
    >
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-[clamp(2rem,4vw,4rem)]">
        <div>
          <h2 className="font-bold text-gray-900 text-[clamp(1.75rem,5vw,7rem)] leading-tight">
            {t("title")}
          </h2>

          <p className="text-gray-700 text-[clamp(1rem,3vw,4rem)]">{t("subtitle")}</p>
        </div>

        {/* CTA Button linked with locale */}
        <Link href={`/${locale}/services`}>
          <Button variant="blue" size="md" className="font-extrabold">
            {t("viewAll")}
          </Button>
        </Link>
      </div>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-[clamp(1rem,3vw,2rem)]
        "
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <CardDetailsSkeleton key={i} />)
          : displayedServices?.map((service: Iservices) => (
              <CardDetails
                key={service.id}
                btn={t("bookButton")}
                link={`/${locale}/booking`}
                service={service}
              />
            ))}
      </div>

      {/* LOADING TEXT */}
      {isLoading && <p className="text-center text-gray-500 mt-10">{t("loading")}</p>}
    </section>
  );
}
