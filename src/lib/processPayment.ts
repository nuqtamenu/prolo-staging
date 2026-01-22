import { PaymentWebHookRequestBody, PaymentLinkRequest } from "./types";
import { savePayment } from "./firebase/db";
import axios from "axios";
import { sendEmail } from "./emails/sendEmail";
import { buildPaymentEmails } from "./emails/emails";

/**
 * Major Tasks
 * 1. Save Payment Data
 * 2. Send Confirmational Emails (Customer & Company)
 */

export async function processPayment(data: PaymentWebHookRequestBody) {
  try {
    // 1. Save Payment Data
    savePayment(data);

    // Get Link Status
    const paymentLinkStatus = await axios.post(
      `${process.env.INTERPAY_BASE_URL}/api/v1/PaymentLinks/GetPaymentLinkStatus`,
      { id: data.paymentLinkId },
      {
        headers: {
          "Content-Type": "application/json",
          PublicKey: process.env.INTERPAY_PUBLIC_KEY || "",
          SecretKey: process.env.INTERPAY_SECRET_KEY || "",
        },
      }
    );

    // Payment Link Status
    const linkStatus = paymentLinkStatus.data as PaymentLinkRequest;

    if ("errors" in linkStatus) {
      // Send Email To Developer About Error
      sendEmail({
        to: process.env.DEVELOPER_EMAIL || "nuqtamenu@gmail.com",
        subject: "Error Fetching Payment Link Status",
        html: `<p>Dear Developer! </br>An error occurred while fetching the payment link status.</p></br> Time: ${new Date().toISOString()}</p> </br> Details: <code><pre>${JSON.stringify(linkStatus, null, 2)}</pre></code>`,
      });
    }

    // 2. Send Emails
    // Getting Locale from Reference Number, For More Info See _components/forms/utils/getShipmentReference()
    const {
      // Customer Email Components
      customerEmailSubject,
      customerEmail,

      // Company Email Components
      companyEmailSubject,
      companyEmail,
    } = buildPaymentEmails({
      customerName: linkStatus.firstName || "Null",
      locale: (data.referenceNumber?.slice(3, 5) as "ar" | "en") || "ar",
      senderName: linkStatus.firstName || "Null",
      customerEmail: linkStatus.email || "null",
      referenceNumber: data.referenceNumber || "null",
      amount: String(linkStatus.amount) || "null",
      timestamp: data.transactionDate,
      transactionId: data.transactionId,
    });

    // Customer Email
    if (linkStatus.email) {
      sendEmail({
        to: linkStatus.email,
        subject: customerEmailSubject,
        html: customerEmail,
      });
    }

    // Company Email
    const companyEmailAddress = process.env.COMPANY_PAYEMENT_EMAIL;
    if (companyEmailAddress) {
      sendEmail({
        to: companyEmailAddress,
        subject: companyEmailSubject,
        html: companyEmail,
      });
    }

    return true;
  } catch (error) {
    console.error("Error processing payment:", error);

    // Sending Email To Developer About Error
    const developerEmail = process.env.DEVELOPER_EMAIL;
    if (developerEmail) {
      sendEmail({
        to: developerEmail,
        subject: "PROLO : Error In Processing Payment",
        html: `<pre><code>${JSON.stringify(error, null, 2)}</code></pre>`,
      });
    }
    return false;
  }
}
