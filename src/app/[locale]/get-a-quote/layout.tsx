import Link from "next/link";
import { PageHeader } from "../_components/components";
import { getLocale, getMessages } from "next-intl/server";

export type GetAQuotePageMessages = {
  pageTitle: {
    heading: string;
    description: string;
    icon?: string;
  };
  helpPara: {
    first: string;
    phone: string;
    mid: string;
    ourSupport: string;
    last: string;
  };
};

// ---------- SEO
import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";

// SEO for Get A Qoute Page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const imageUrl = SITE_URL + t.getAQuotePage.image;

  return {
    title: t.getAQuotePage.title,
    description: t.getAQuotePage.description,

    alternates: {
      canonical: `${SITE_URL}/${locale}/get-a-quote`,
      languages: {
        en: `${SITE_URL}/en/get-a-quote`,
        ar: `${SITE_URL}/ar/get-a-quote`,
      },
    },

    openGraph: {
      title: t.getAQuotePage.title,
      description: t.getAQuotePage.description,
      url: `${SITE_URL}/${locale}/get-a-quote`,
      images: getSeoImages(imageUrl, "Get A Quote Page"),
    },

    twitter: {
      card: "summary_large_image",
      title: t.getAQuotePage.title,
      description: t.getAQuotePage.description,
      images: getSeoImages(imageUrl, "Get A Quote Page"),
    },
  };
}

export default async function GetAQuoteLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const getAQuotePageMessages = (await getMessages()).getAQuotePage as GetAQuotePageMessages;

  return (
    <>
      <PageHeader
        heading={getAQuotePageMessages.pageTitle.heading}
        description={getAQuotePageMessages.pageTitle.description}
        image="/icons/getAQuote.png"
        icon={getAQuotePageMessages.pageTitle.icon}
      />

      {/* Form */}
      <div className="prolo-container my-8 sm:my-10 md:my-16">{children}</div>
      <div className="prolo-container">
        <p className="my-6 text-sm">
          {getAQuotePageMessages.helpPara.first}{" "}
          <Link
            href={"tel:8003044448"}
            className="hover:text-shadow-blue-hover text-theme-blue underline"
            dir="ltr"
          >
            8003044448
          </Link>{" "}
          {getAQuotePageMessages.helpPara.mid}{" "}
          <Link
            href={"/" + locale + "/contact"}
            className="hover:text-shadow-blue-hover text-theme-blue underline"
          >
            {getAQuotePageMessages.helpPara.ourSupport}
          </Link>{" "}
          {getAQuotePageMessages.helpPara.last}
        </p>
      </div>
    </>
  );
}
