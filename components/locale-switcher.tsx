"use client";
import { getLocaleName, getLocalizedUrl, LocalesValues } from "intlayer";
import { useLocale } from "next-intlayer";
import { useRouter } from "next/navigation";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } = useLocale();
  const router = useRouter();

  const handleChange = (newLocale: LocalesValues) => {
    setLocale(newLocale);
    const newUrl = getLocalizedUrl(pathWithoutLocale, newLocale);
    router.replace(newUrl);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        onChange={(e) => handleChange(e.target.value as LocalesValues)}
        value={locale}
        className="border border-gray-300 rounded-md p-2"
      >
        {availableLocales.map((localeItem) => (
          <option key={localeItem} value={localeItem}>
            {getLocaleName(localeItem, locale)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
