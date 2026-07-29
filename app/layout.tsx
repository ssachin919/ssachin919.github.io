import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";

import "@/lib/fontawesome";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Mission Bhavya Bharat | Sachin Anand",
  description:
    "From IIT Kanpur to Vrindavan — building Humantra and CoinsLive for clarity within and opportunity without. Technology · Spirituality · Nation Building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${montserrat.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
