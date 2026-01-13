import { Gilda_Display } from "next/font/google";
import "./globals.css";
import { getLocale } from "next-intl/server";

const gildaDisplay = Gilda_Display({
  variable: "--font-gilda-display",
  subsets: ["latin"],
  weight: ["400"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const isRTL = locale === "ar";
  return (
    <html dir={isRTL ? "rtl" : "ltr"}>
      <body className={`${gildaDisplay.variable} antialiased`}>{children}</body>
    </html>
  );
}
