import LocaleSwitcher from "@/components/locale-switcher";
import MyComponent from "@/components/my-component";
import { LocalesValues } from "intlayer";
import { IntlayerClientProvider, NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const page: NextPageIntlayer<{ params: Promise<{ locale: LocalesValues }> }> = async ({
  params,
}) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <MyComponent />
        <LocaleSwitcher />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default page;
