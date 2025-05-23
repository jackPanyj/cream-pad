import type { Metadata } from "next";
import { Baloo_2, Manrope, Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Cream Pad: Transforming Token Launches with Dutch Dual-Track Auctions",
  icons: {
    icon: "/images/logo.svg"
  },
  description:
    "Cream Pad is the first asset launchpad on Sonic SVM, redefining token distribution with its unique Dutch Dual-Track Auction."
};

const manrope = Manrope({
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope"
});

const baloo2 = Baloo_2({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baloo2"
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="app"
        className={`${manrope.variable} ${baloo2.variable} ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
