"useClient";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { ServiceCard } from "./components";
import { useLocale } from "next-intl";

type Service = {
  name: string;
  description: string;
  slug: string;
  link: string;
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
export default function IndividualServices({ hovered, setHovered, title, services }: Props) {
  const locale = useLocale();
  const serv = JSON.parse(JSON.stringify(services)) as { title: string; cards: Service[] };
  const cards = JSON.parse(JSON.stringify(serv.cards)) as Service[];
  return (
    <div
      className={`group bg-base1 relative flex flex-col justify-between overflow-hidden rounded-xl px-8 pt-8 transition-all duration-300 lg:h-[450px] ${
        hovered === "none" ? "w-[49%]" : hovered === "right" ? "w-[20%]" : "w-[78%]"
      }`}
      onMouseEnter={() => setHovered("left")}
    >
      {/* Title & Button */}
      <div className="flex w-full items-center justify-between">
        <h4 className={`text-xl font-medium backdrop-opacity-100 transition-opacity duration-700`}>
          {title}
        </h4>
      </div>
      {/* img */}
      <div className="relative z-3 flex h-[463px] w-full items-end justify-center group-hover:z-2">
        <Image
          src={
            hovered === "right"
              ? "/images/indvidual-services-close.webp"
              : "/images/indvidual-services-open.webp"
          }
          alt="Arab male delivery boy is delivering parcel to an arab woman in hijab or burqa"
          width={346}
          height={463}
          className="mx-auto w-auto opacity-100 transition-opacity duration-300 group-hover:opacity-0"
        />
      </div>

      {/* Hidden Content */}
      <div className="bg-base2 absolute inset-0 z-2 flex flex-col gap-4 rounded-md p-4 opacity-0 transition-opacity duration-300 group-hover:z-3 group-hover:opacity-100">
        <h5 className="bg-theme-white hidden w-full rounded-md px-4 py-2 text-xl font-medium">
          {title}
        </h5>

        {/* Services Boxes */}
        <div
          className={`grid w-full grid-cols-3 gap-2 overflow-hidden opacity-0 transition-opacity delay-400 duration-300 group-hover:opacity-100`}
        >
          {cards.map((service, ind) => (
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
