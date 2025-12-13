import { satoshi, tajawal } from "../fonts/fonts";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header, Footer } from "./_components/components"; // excl: Popup
import HeaderContainer from "./_components/HeaderContainer";
import TypebotWidgetLazy from "./_components/optimized/TypebotLazy";

import PopupLazy from "./_components/optimized/PopupLazy";
import ResposiveHeader from "./_components/Header/ResponsiveHeader";

import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";

// SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const imageUrl = SITE_URL + t.homepage.image;

  return {
    title: t.homepage.title,
    description: t.homepage.description,

    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
      },
    },

    openGraph: {
      title: t.homepage.title,
      description: t.homepage.description,
      url: `${SITE_URL}/${locale}`,
      images: getSeoImages(imageUrl, "Prolo Professional Logistics"),
    },

    twitter: {
      card: "Prolo Professional Logistics",
      title: t.homepage.title,
      description: t.homepage.description,
      images: getSeoImages(imageUrl, "Prolo Professional Logistics"),
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isArabic = locale === "ar";
  const fontClass = isArabic ? tajawal.className : satoshi.className + " tracking-tight";

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"} className={fontClass + " scroll-smooth"}>
      <body>
        <NextIntlClientProvider>
          <HeaderContainer>
            <Header />
            <ResposiveHeader />
          </HeaderContainer>
          <main>{children}</main>
          <Footer />
          <PopupLazy />
          <TypebotWidgetLazy />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
