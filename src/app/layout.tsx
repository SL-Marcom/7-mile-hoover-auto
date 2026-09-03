import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { business } from "@/content/business";
import { getOrganizationSchema } from "@/content/schema";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const siteUrl = business.siteUrl.value;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.brandName.value} | Auto Repair in Detroit, MI`,
    template: `%s | ${business.shortName}`,
  },
  description:
    "Full-service mechanical auto repair in Detroit, MI. Brakes, engines, transmissions, diagnostics, and more. Call now or request a free quote.",
  openGraph: {
    type: "website",
    siteName: business.brandName.value,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
