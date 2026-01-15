import Button from "@/components/button";
import FlagList from "@/components/FlagList";
import TimeWeatherWidget from "@/components/TimeWeatherWidget";
import { cn } from "@/utils/cn";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Header() {
  const t = await getTranslations("header");
  const locale = await getLocale();
  const isRTL = locale === "ar";
  return (
    <header
      className={cn("relative min-h-screen w-full flex flex-col")}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/10 z-10" /> */}

      {/* Video Background */}
      <video
        src="/header.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover absolute z-0"
      />

      {/* Main Content */}
      <div className="flex-1 relative z-20 grid grid-cols-1 lg:grid-cols-2">
        {/* Column 1 - Text & Buttons */}
        <div
          className="container text-white flex flex-col justify-center px-[5%] max-w-[1400px]"
          style={{ gap: "clamp(1rem, 1vw, 5rem)" }} // لا تغيير هنا
        >
          <h1
            className="font-bold text-primary text-center lg:text-start"
            style={{ fontSize: "clamp(2rem, 5vw, 6rem)", lineHeight: "1.1" }}
          >
            {t("title")}
          </h1>
          <h2
            className="font-bold text-white text-center lg:text-start"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 3.5rem)", lineHeight: "1.2" }}
          >
            {t("subtitle")}
          </h2>

          <div className="flex flex-row items-center justify-center lg:justify-start flex-wrap gap-[clamp(1rem,1.5vw,2rem)]">
            <Button variant="primary" size="md" className="font-extrabold">
              
              {t("cta.bookConsultation")}
            </Button>

            <Link href={`/${locale}/services`}>
              <Button variant="secondary" size="md" className="font-extrabold">
                {t("cta.exploreServices")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Column 2 - Widget */}
        <div className="relative flex items-center justify-center px-[5%] mt-8 lg:mt-0">
          <TimeWeatherWidget />
        </div>
      </div>

      {/* Flags at bottom */}
      <div className="w-full absolute bottom-2 md:bottom-[2%] lg:bottom-[5%] px-4 left-0 right-0">
        <FlagList />
      </div>
    </header>
  );
}
