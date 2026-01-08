import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";

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

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <section className="min-h-svh pt-20">{children}</section>
      <Footer />
    </NextIntlClientProvider>
  );
}
