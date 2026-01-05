import { NextResponse } from "next/server";
import { submitCreateShipmentForm } from "@/lib/submitCreateShipmentForm";
import { CreateShipmentFormData } from "@/lib/types";
import { buildShipmentEmails } from "@/lib/emails/emails";
import { sendEmail } from "@/lib/emails/sendEmail";
import { config } from "@/lib/config";
export async function POST(req: Request) {
  console.log("Received request to /api/save-shipment");
  const companyEmailAddress = config.companyShipmentEmail || "";
  try {
    const { locales, data } = (await req.json()) as {
      locales: "en" | "ar";
      data: CreateShipmentFormData;
    };

    try {
      await submitCreateShipmentForm(data);
    } catch (error) {
      console.error("Error saving shipment data:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save shipment data to formbold service",
          error: "Failed to save shipment data",
        },
        { status: 500 }
      );
    }

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

    return NextResponse.json(
      { success: true, message: "Successfully saved the form data" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        err,
      },
      { status: 500 }
    );
  }
}
