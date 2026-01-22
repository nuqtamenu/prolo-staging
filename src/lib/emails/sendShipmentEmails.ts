import { CreateShipmentFormData } from "../types";
import { buildShipmentEmails } from "./emails";
import { sendEmail } from "./sendEmail";

export async function sendShipmentEmails({
  locales,
  data,
}: {
  locales: "en" | "ar";
  data: CreateShipmentFormData;
}) {
  // Company Email Address
  const companyEmailAddress = process.env.COMPANY_SHIPMENT_EMAIL || "";

  // Build Emails
  const {
    senderEmailSubject,
    senderEmail,
    receiverEmailSubject,
    receiverEmail,
    companyEmailSubject,
    companyEmail,
  } = buildShipmentEmails({ locales, data });

  // Send Email To Sender
  sendEmail({
    to: data.senderEmail,
    subject: senderEmailSubject,
    html: senderEmail,
  });

  // Send Email To Receiver
  sendEmail({
    to: data.receiverEmail,
    subject: receiverEmailSubject,
    html: receiverEmail,
  });

  // Send Email To Company
  if (companyEmailAddress) {
    sendEmail({
      to: companyEmailAddress,
      subject: companyEmailSubject,
      html: companyEmail,
    });
  } else {
    console.warn("Company email address is not configured. Skipping company email.");
  }
}
