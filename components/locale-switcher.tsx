"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import ReactFlagsSelect from "react-flags-select";

// Map locale codes to country codes
const localeToCountry: Record<string, string> = {
  ar: "AE",
  en: "US",
  fr: "FR",
  de: "DE",
  es: "ES",
  it: "IT",
};

// Map country codes to locale codes
const countryToLocale: Record<string, string> = {
  AE: "ar",
  US: "en",
  FR: "fr",
  DE: "de",
  ES: "es",
  IT: "it",
};

const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");
  const [isPending, startTransition] = useTransition();

  const selectedCountry = localeToCountry[locale] || "AE";

  const handleChange = (countryCode: string) => {
    const newLocale = countryToLocale[countryCode] || "ar";

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 bg-black/10 rounded pointer-events-none z-10" />
      )}
      <ReactFlagsSelect
        selectButtonClassName="!text-white"
        searchPlaceholder={t("searchPlaceholder")}
        selected={selectedCountry}
        selectedSize={20}
        optionsSize={20}
        onSelect={(code) => handleChange(code)}
        countries={["AE", "US", "FR", "DE", "ES", "IT"]}
        customLabels={{
          AE: "العربية",
          US: "English",
          FR: "Français",
          DE: "Deutsch",
          ES: "Español",
          IT: "Italiano",
        }}
        showSelectedLabel={true}
        showOptionLabel={true}
      />
    </div>
  );
};

export default LocaleSwitcher;
