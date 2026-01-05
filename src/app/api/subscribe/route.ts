import { NextResponse } from "next/server";
import { SubmitSubscriptionForm } from "@/lib/submitSubscriptionForm";
import { buildSubscriptionEmails } from "@/lib/emails/emails";
import { sendEmail } from "@/lib/emails/sendEmail";
import { config } from "@/lib/config";

export async function POST(req: Request) {
  const companyEmailAddress = config.companySubscriptionEmailAddress || "";

  try {
    const { locales, data } = (await req.json()) as {
      locales: "en" | "ar";
      data: { email: string };
    };

    const { email } = data;
    if (!locales || !email) {
      return NextResponse.json({ success: false, message: "Incompleted req body." });
    }

    // Submit Form
    SubmitSubscriptionForm(data);

    // Build Email Data
    const { customerEmail, companyEmail, customerEmailSubject, companyEmailSubject } =
      buildSubscriptionEmails({
        locale: locales,
        data: { ...data },
      });

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
      console.log("Company Email For Subcription Form Not Found");
    }

    return NextResponse.json(
      { success: true, message: "User Successfully Subscribed" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Error Subscribing User",
        error: "Internal Server Error at  /api/subscribe",
        err,
      },
      { status: 500 }
    );
  }
}
