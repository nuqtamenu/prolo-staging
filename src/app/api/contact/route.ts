import { NextResponse } from "next/server";
import { submitContactForm } from "@/lib/submitContactForm";
import { ContactFormData } from "@/lib/types";
import { buildContactEmails } from "@/lib/emails/emails";
import { sendEmail } from "@/lib/emails/sendEmail";
export async function POST(req: Request) {
  const companyEmailAddress = process.env.COMPANY_CONTACT_EMAIL || "";

  try {
    const { locales, data } = (await req.json()) as { locales: "en" | "ar"; data: ContactFormData };
    try {
      // Save contact form data
      await submitContactForm(data);
    } catch (err) {
      console.log("Error saving the contact form data :: ", err);
    }

    // Build Contact Form Emails
    const { customerEmailSubject, customerEmail, companyEmailSubject, companyEmail } =
      buildContactEmails({ locales, data });

    // Send Confirmation Email To Subscriber
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
      console.log("Company Email For Contact Form Not Found");
    }

    return NextResponse.json({
      success: true,
      message: "Contact Form submitted successfully.",
    });

    // return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log("Error occured while submitting the contact form :: ", err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed To Submit Contact Form",
        error: "Internal Server Error",
        err,
      },
      { status: 500 }
    );
  }
}
