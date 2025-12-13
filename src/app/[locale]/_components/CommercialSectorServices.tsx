"useClient";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { ServiceCard } from "./components";
import { useLocale } from "next-intl";

type Service = {
  name: string;
  description: string;
  link: string;
  slug: string;
};
type Props = {
  hovered: "left" | "right" | "none";
  setHovered: Dispatch<SetStateAction<"left" | "right" | "none">>;
  title: string;
  services: {
    title: string;
    cards: Service[];
  };
};

export default function CommercialSectorServices({ hovered, setHovered, title, services }: Props) {
  const locale = useLocale();

  return (
    <div
      className={`group bg-base1 relative flex flex-col justify-between overflow-hidden rounded-xl pt-8 transition-all duration-300 ${
        hovered === "none" ? "w-[49%]" : hovered === "right" ? "w-[78%]" : "w-[20%]"
      } lg:h-[450px]`}
      onMouseEnter={() => setHovered("right")}
    >
      {/* Title & Button */}
      <div className="flex w-full items-center justify-between">
        <h4 className="px-8 text-xl font-medium">{title}</h4>
      </div>
      {/* img */}
      <div className="relative z-3 flex h-[463px] w-full items-end justify-center opacity-100 transition-opacity duration-300 group-hover:z-2 group-hover:opacity-0">
        <Image
          src="/images/enterprise-services.webp"
          alt="Arab male delivery boy is delivering parcel to an arab woman in hijab or burqa"
          width={346}
          height={463}
          className="w-full max-w-[547px]"
        />
      </div>
      {/* Hidden Content */}
      <div className="bg-base2 absolute inset-0 z-2 flex flex-col gap-4 rounded-md p-4 opacity-0 transition-opacity duration-300 group-hover:z-3 group-hover:opacity-100">
        <h5 className="bg-theme-white hidden w-full rounded-md px-4 py-2 text-xl font-medium">
          {title}
        </h5>

        {/* Services Boxes */}
        <div
          className={`grid w-full grid-cols-4 gap-2 overflow-hidden opacity-0 transition-opacity delay-400 duration-300 group-hover:opacity-100`}
        >
          {services.cards.map((service, ind) => (
            <ServiceCard
              key={service.link}
              slug={service.slug}
              title={service.name}
              description={service.description}
              link={`/${locale}${service.link}`}
              num={ind + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
