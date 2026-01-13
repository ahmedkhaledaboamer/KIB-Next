import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  // Enable static rendering
  setRequestLocale(locale);

  const isRTL = locale === "ar";
  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <section className="min-h-svh" dir={isRTL ? "rtl" : "ltr"}>
        {children}
      </section>
      <ScrollToTopButton />
      <Footer />
    </NextIntlClientProvider>
  );
}
