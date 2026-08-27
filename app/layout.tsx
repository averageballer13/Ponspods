import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-num",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ponspods.xyz"),
  title: {
    default: "Ponspods · Farm the volatility of real-world assets",
    template: "%s · Ponspods",
  },
  description:
    "Wrap tokenized stocks into Pods, farm the volatility that traditional markets create for free, and lever it up. Real yield from real assets, no emissions. Built on Robinhood Chain.",
  openGraph: {
    title: "Ponspods · Farm the volatility of real-world assets",
    description:
      "Pods for tokenized stocks. Volatility farming, leveraged volatility farming and self-lending markets on Robinhood Chain.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
