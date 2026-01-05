import nodemailer from "nodemailer";

export async function sendEmail(data: { to: string; subject: string; html: string }) {
  const { to, subject, html } = data;

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
      from: `"Prolo" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error("Email Error :: ", error);
    return false;
  }
}
