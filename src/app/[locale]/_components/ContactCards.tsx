import { Icon } from "@iconify/react";
import { getMessages } from "next-intl/server";
import Link from "next/link";

export type ContactMessages = {
  title: string;
  mainBranch: {
    title: string;
    location: string;
  };
  phone: {
    title: string;
    number: string;
    number2: string;
  };
  emails: {
    title: string;
    email1: string;
    email2: string;
  };
  timing: {
    title: string;
    line1: string;
    line2: string;
  };
};

export default async function ContactCards() {
  const messages = await getMessages();
  const contactMessages = messages.contactPage.contact as ContactMessages;

  return (
    <div className="prolo-container">
      <h4 className="section-heading">{contactMessages.title}</h4>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-4 md:gap-4">
        {/* Head Office */}
        <div className="bg-base1 rounded-xl p-6">
          <h5 className="text-base font-medium">📍 {contactMessages.mainBranch.title}</h5>
          <p className="mt-2 text-sm">{contactMessages.mainBranch.location}</p>
        </div>
        {/* Phone */}
        <div className="bg-base1 rounded-xl p-6">
          <h5 className="text-base font-medium">📞 {contactMessages.phone.title}</h5>
          <div className="mt-2 flex items-center gap-2">
            <div className="size-4">
              <Icon icon={"hugeicons:whatsapp"} className="size-4" />
            </div>
            <Link
              dir="ltr"
              href={`https://api.whatsapp.com/send?phone=${contactMessages.phone.number}`}
              className="hover:underline"
            >
              {contactMessages.phone.number}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-4 items-center">
              <Icon icon={"hugeicons:call-02"} className="size-4" />
            </div>
            <Link
              dir="ltr"
              href={`tel:${contactMessages.phone.number2}`}
              className="hover:underline"
            >
              {contactMessages.phone.number2}
            </Link>
          </div>
        </div>
        {/* Emails */}
        <div className="bg-base1 rounded-xl p-6">
          <h5 className="text-base font-medium">📧 {contactMessages.emails.title}</h5>
          <Link dir="ltr" href={`mailto:${"sales@prolo.com"}`} className="hover:underline">
            {contactMessages.emails.email1}
          </Link>
          <br />
          <Link dir="ltr" href={`mailto:${"support@prolo.com"}`} className="hover:underline">
            {contactMessages.emails.email2}
          </Link>
        </div>
        {/* Business Hours */}
        <div className="bg-base1 rounded-xl p-6">
          <h5 className="text-base font-medium">🕒 {contactMessages.timing.title}</h5>
          <p className="mt-2">{contactMessages.timing.line1}</p>
          <p>{contactMessages.timing.line2}</p>
        </div>
      </div>
    </div>
  );
}
