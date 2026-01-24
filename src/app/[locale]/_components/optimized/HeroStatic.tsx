import Image from "next/image";

export default function HeroStatic() {
  return (
    <div className="relative h-full w-full">
      <Image
        src={"/images/hero/1.png"}
        alt={`Prolo Professional Logistics Van is moving form desert in Saudia Arabia`}
        className="relative z-[-1] h-full w-full object-cover"
        fill
        loading="lazy"
        priority={false}
        fetchPriority="low"
        decoding="async"
      />
      <div className="absolute inset-0 z-2 bg-black/30"></div>
    </div>
  );
}
