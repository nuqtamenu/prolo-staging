import { Icon } from "@iconify/react";
import Link from "next/link";
type LinkItem = {
  icon?: string;
  text: string;
  link: string;
};

type LinkSegment = {
  title: string;
  links: LinkItem[];
  showTitle?: boolean;
};

export default async function FooterContactLinkSegment({
  showTitle = true,
  title,
  links,
}: LinkSegment) {
  return (
    <div>
      {showTitle && <h4 className="mb-2 text-lg font-bold">{title}</h4>}
      <ul className="flex flex-col gap-2">
        <li className="w-fit cursor-pointer text-base hover:underline">
          <Link href={links[0].link} className="flex gap-4" target="_blank">
            <span className="inline-block size-6">
              {links[0].icon && <Icon icon={links[0].icon || ""} className="size-6" />}
            </span>
            <span>{links[0].text}</span>
          </Link>
        </li>
        <li className="w-fit cursor-pointer text-base hover:underline">
          <Link href={links[1].link} className="flex gap-4" target="_blank">
            <span className="inline-block size-6">
              {links[1].icon && <Icon icon={links[1].icon || ""} className="size-6" />}
            </span>
            <span dir="ltr">{links[1].text}</span>
          </Link>
        </li>
        <li className="w-fit cursor-pointer text-base hover:underline">
          <Link href={links[2].link} className="flex gap-4" target="_blank">
            <span className="inline-block size-6">
              {links[2].icon && <Icon icon={links[2].icon || ""} className="size-6" />}
            </span>
            <span>{links[2].text}</span>
          </Link>
        </li>
        <li className="w-fit cursor-pointer text-base hover:underline">
          <Link href={links[3].link} className="flex gap-4" target="_blank">
            <span className="inline-block size-6">
              {links[3].icon && <Icon icon={links[3].icon || ""} className="size-6" />}
            </span>
            <span>{links[3].text}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
