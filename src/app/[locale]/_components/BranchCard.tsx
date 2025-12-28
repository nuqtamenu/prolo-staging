import { Icon } from "@iconify/react";
import Link from "next/link";

type BranchCardProps = {
  title: string;
  location: string;
  contact: string;
  email: string;
};
export default function BranchCard({ title, location, contact, email }: BranchCardProps) {
  return (
    <div className="bg-base1 rounded-xl p-6">
      <h5 className="text-base font-medium">📍 {title}</h5>
      <p className="mt-2 hidden text-sm">{location}</p>
      <ul className="mt-4">
        <li>
          <Link
            href={`https://api.whatsapp.com/send?phone=${contact}`}
            className="flex items-center gap-2 hover:underline"
          >
            <span className="flex size-4 items-center">
              <Icon icon={"hugeicons:whatsapp"} className="size-4" />
            </span>{" "}
            {contact}
          </Link>
        </li>
        {/* Email */}
        <li>
          <Link href={`mailto:${email}`} className="flex items-center gap-2 hover:underline">
            <span className="flex size-4 items-center">
              <Icon icon={"hugeicons:mail-02"} className="size-4" />
            </span>{" "}
            {email}
          </Link>
        </li>
      </ul>
    </div>
  );
}
