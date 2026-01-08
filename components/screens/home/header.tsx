import Button from "@/components/button";
import FlagList from "@/components/FlagList";
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="relative grid grid-cols-1 lg:grid-cols-2 h-svh">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <video
        src="/header.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover absolute z-0"
      />
      <div
        className="container z-20 text-white text-center flex flex-col items-center justify-center"
        style={{
          gap: "clamp(1.5rem, 3vw, 4rem)",
        }}
      >
        <h1
          className="font-bold text-primary"
          style={{
            fontSize: "clamp(2rem, 5vw, 6rem)",
            lineHeight: "1.1",
          }}
        >
          {t("title")}
        </h1>
        <h2
          className="font-bold text-white"
          style={{
            fontSize: "clamp(1.25rem, 2.5vw, 3rem)",
            lineHeight: "1.2",
          }}
        >
          {t("subtitle")}
        </h2>
        <div
          className="flex items-center justify-center flex-col lg:flex-row"
          style={{
            gap: "clamp(1rem, 2vw, 2rem)",
          }}
        >
          <Button variant="primary" size="lg" className="font-extrabold">
            {t("cta.bookConsultation")}
          </Button>
          <Button variant="secondary" size="lg" className="font-extrabold">
            {t("cta.exploreServices")}
          </Button>
        </div>
        <div className="w-full  absolute bottom-2 md:bottom-[4%] lg:bottom-[10%] left-0 right-0 px-4">
          <FlagList />
        </div>
      </div>
    </header>
  );
}
