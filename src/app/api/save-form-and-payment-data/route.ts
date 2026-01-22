import { savePaymentLink, saveShipmentFormData } from "@/lib/firebase/db";
import { SaveFormAndPaymentReqBody } from "@/lib/types";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/emails/sendEmail";
import { buildPaymentLinkEmails } from "@/lib/emails/emails";
export async function POST(req: Request) {
  try {
    const { formData, paymentLink } = (await req.json()) as SaveFormAndPaymentReqBody;

    // Save Form Data
    const savedFormData = await saveShipmentFormData(formData);

    // Save Payment Data
    const savedPaymentLink = await savePaymentLink(paymentLink);

    // Send Email To Sender

    // Generating Customer Emails
    const { customerEmail, customerEmailSubject } = buildPaymentLinkEmails({
      locale: formData.locale,
      senderName: formData.senderName,
      referenceNumber: paymentLink.paymentLink.referenceNumber,
      paymentLink: paymentLink.paymentLink.paymentLink,
      amount: paymentLink.paymentLink.amount,
    });

    await sendEmail({
      to: formData.senderEmail,
      subject: customerEmailSubject,
      html: customerEmail,
    });

    return NextResponse.json({
      success: true,
      message: "Saved Data successfully",
      savedFormData: Boolean(savedFormData),
      savedPaymentLink: Boolean(savedPaymentLink),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Saving Form & Payment Data Failed",
      error,
    });
  }
}
