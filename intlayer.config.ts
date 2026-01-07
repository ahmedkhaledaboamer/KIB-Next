import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["ar", "en", "fr"],
    defaultLocale: Locales.ARABIC,
    // defaultLocale:Locales.ARABIC
  },
};

export default config;
