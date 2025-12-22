import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Response) {
  console.log("I am called");
  const { to, subject, html } = (await req.json()) as { to: string; subject: string; html: string };

  if (!to || !subject || !html) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 500 });
  }

  try {
    // Create transporter using Google SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Prolo.sa" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
