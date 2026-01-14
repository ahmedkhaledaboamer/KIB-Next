"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import ReactFlagsSelect from "react-flags-select";

// Map locale codes to country codes
const localeToCountry: Record<string, string> = {
  ar: "AE",
  en: "US",
  fr: "FR",
  de: "DE",
};

// Map country codes to locale codes
const countryToLocale: Record<string, string> = {
  AE: "ar",
  US: "en",
  FR: "fr",
  DE: "de",
};

const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");

  // Get the current country code based on locale
  const selectedCountry = localeToCountry[locale] || "AE";

  const handleChange = (countryCode: string) => {
    const newLocale = countryToLocale[countryCode] || "ar";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <ReactFlagsSelect
      selectButtonClassName="!text-white"
      searchPlaceholder={t("searchPlaceholder")}
      selected={selectedCountry}
      selectedSize={20}
      optionsSize={20}
      onSelect={(code) => handleChange(code)}
      countries={["AE", "US", "FR", "DE"]}
      customLabels={{
        AE: "العربية",
        US: "English",
        FR: "Français",
        DE: "Deutsch",
      }}
      showSelectedLabel={true}
      showOptionLabel={true}
    />
  );
};

export default LocaleSwitcher;
