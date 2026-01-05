import { NextResponse } from "next/server";
import { submitGetAQuoteForm } from "@/lib/submitGetAQuoteForm";
import { GetAQuoteFormData } from "@/lib/types";
import { buildQuoteEmails } from "@/lib/emails/emails";
import { sendEmail } from "@/lib/emails/sendEmail";
import { config } from "@/lib/config";

export async function POST(req: Request) {
  const companyEmailAddress = config.companyQuoteEmailAddress || "";

  try {
    const { locales, data } = (await req.json()) as {
      locales: "ar" | "en";
      data: GetAQuoteFormData;
    };

    // Save Form Data
    try {
      await submitGetAQuoteForm(data);
    } catch (error) {
      console.log("Error saving contact data :: ", error);
    }

    // Build Emails
    const { customerEmailSubject, customerEmail, companyEmailSubject, companyEmail } =
      buildQuoteEmails({ locales, data });

    // Send Confirmation Email To Customer
    // Sending To Customer
    await sendEmail({
      to: data.email,
      subject: customerEmailSubject,
      html: customerEmail,
    });

    // Send Confirmation Email To Company
    // Sending To Company
    // TODO: Integrate Company Email
    if (companyEmailAddress) {
      await sendEmail({
        to: companyEmailAddress,
        subject: companyEmailSubject,
        html: companyEmail,
      });
    } else {
      console.log("Company Email For Get A Quote Form Not Found");
    }

    // Send Emails
    return NextResponse.json(
      { success: true, message: "Get A Quote Form submitted successfully." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Error submitting the Get A Quote Form",
        error: "Internal Server Error",
        err,
      },
      { status: 500 }
    );
  }
}
