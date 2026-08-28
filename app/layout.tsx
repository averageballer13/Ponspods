import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PageBackground } from "@/components/visual/PageBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ponspods.com"),
  title: "Ponspods · Get paid for the volatility Wall Street makes",
  description:
    "Wrap tokenized stocks into Pods and earn from every trade that keeps their price in line. Real yield, no emissions. Built on Robinhood Chain.",
  openGraph: {
    title: "Ponspods · Get paid for the volatility Wall Street makes",
    description:
      "Volatility farming for tokenized stocks. Wrap, farm, grow. Built on Robinhood Chain.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <PageBackground />
        {children}
      </body>
    </html>
  );
}
