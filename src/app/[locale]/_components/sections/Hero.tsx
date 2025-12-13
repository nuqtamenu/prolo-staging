"use client";
import { useLocale, useTranslations } from "next-intl";
import { Button, TrackingInput } from "../components";
import HeroLazyLogos from "../optimized/HeroLazyLogos";
import HeroLazySlider from "../optimized/HeroLazySlider";
// import HeroStatic from "../optimized/HeroStatic";

export default function Hero() {
  const t = useTranslations("homepage");
  const ctas = useTranslations("ctas");
  const locale = useLocale();

  return (
    <section
      id="#hero"
      className="sm:py-auto relative z-1 flex h-dvh w-full flex-col items-center justify-center py-16 text-white"
    >
      {/* Overlay */}
      <div className="absolute inset-0 h-full w-full">
        <HeroLazySlider />
      </div>

      {/* Content */}
      <div className="prolo-container relative z-2 flex h-auto w-full flex-col items-center justify-between gap-8 sm:gap-12 md:gap-16">
        <div>
          {/* Top - title */}
          <h2 className="mx-auto text-center text-2xl/tight font-bold text-white sm:w-[60%] sm:text-3xl/tight">
            {t("hero.title.first")} <span className="text-theme-blue">{t("hero.title.mid")}</span>{" "}
            {t("hero.title.last")}
          </h2>
        </div>

        {/* Buttom & Input */}
        <div className="hidden w-full max-w-[800px] sm:block sm:w-[90%]">
          {/* Button */}
          <Button
            text={ctas("createShipment")}
            href={`/${locale}/create-shipment/`}
            direction="forward"
            className="bg-white-hover/15 hover:bg-theme-blue hover:border-theme-blue mb-4 border border-white"
          />
          {/* Tracking Input */}
          <TrackingInput />
        </div>

        {/* Button */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:hidden">
          <Button
            text={ctas("createShipment")}
            href={`/${locale}/create-shipment/`}
            direction="forward"
            className="bg-white-hover/15 hover:bg-theme-blue hover:border-theme-blue min-w-[200px] border border-white"
          />
          <Button
            text={ctas("trackShipment")}
            href={`/${locale}/tracking/`}
            className="bg-theme-blue hover:bg-blue-hover min-w-[200px]"
            direction="forward"
          />
        </div>

        {/* bottom - description + logos */}
        <div className="prolo-container flex w-full items-center justify-center md:justify-between">
          {/* Hero Logos */}
          <HeroLazyLogos />
        </div>
      </div>
    </section>
  );
}
