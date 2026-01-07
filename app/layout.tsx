import { Gilda_Display } from "next/font/google";
import "./globals.css";

const gildaDisplay = Gilda_Display({
  variable: "--font-gilda-display",
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${gildaDisplay.variable} antialiased`}>{children}</body>
    </html>
  );
}
