import { createShipment } from "@/lib/createShipment";
import { sendEmail } from "@/lib/emails/sendEmail";
import { sendShipmentEmails } from "@/lib/emails/sendShipmentEmails";
import { readShipmentFormData, saveShipment } from "@/lib/firebase/db";
import { processPayment } from "@/lib/processPayment";
import { PaymentWebHookRequestBody, ShipmentResponse } from "@/lib/types";
// import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = (await req.json()) as PaymentWebHookRequestBody;

  const developerEmail = process.env.DEVELOPER_EMAIL;

  // TESTING
  // Sending Req body To Developer
  // TODO: Remove This

  if (developerEmail) {
    await sendEmail({
      to: developerEmail,
      subject: "Webhook Request Body",
      html: `<h2>Header</h2><pre><code>${JSON.stringify(req.headers, null, 2)} -- X-API-KEY: ${req.headers.get("X-API-KEY")}</code></pre><h2>Body</h2><pre><code>${JSON.stringify(data, null, 2)}</code></pre>`,
    });
  }

  // Optional: validate X-API-KEY header
  const apiKey = req.headers.get("X-API-KEY");

  if (apiKey !== process.env.X_API_KEY) {
    // Eamil to developer about unauthorized access attempt
    if (developerEmail) {
      await sendEmail({
        to: developerEmail,
        subject: "Unauthorized Webhook Access Attempt",
        html: `<p>An unauthorized access attempt was made to the Interpay webhook endpoint.</p></br> X-API-KEY Provided: ${apiKey} </br> Time: ${new Date().toISOString()}</p> </br> Details: <code><pre>${JSON.stringify(data, null, 2)}</pre></code>`,
      });
    }
    return NextResponse.json(
      { error: "Unauthorized", success: false, message: "User not authorized" },
      { status: 401 }
    );
  }

  // Check Payment Status
  try {
    if (data.responseCode === "00") {
      //  1. PROCESS PAYMENT
      // - Save Payment Data
      // - Send Confirmational Emails
      await processPayment(data);

      try {
        // 2. Create Shipment & Send Emails
        // Read Shipment Form Data from Firestore
        const formData = await readShipmentFormData(data.referenceNumber || "");

        if (formData && formData.length === 0) {
          // Send Email To Developer About Missing Form Data
          await sendEmail({
            to: "nuqtamenu@gmail.com",
            subject: "Missing Shipment Form Data",
            html: `<p>Dear Developer! </br>Shipment Form Data is missing for Reference Number: ${data.referenceNumber}</p></br> Time: ${new Date().toISOString()}</p> </br> Details: <code><pre>${JSON.stringify(data, null, 2)}</pre></code>`,
          });
        }

        // i) Create Shipment
        if (formData && formData[0] !== null && formData[0] !== undefined) {
          // Creating Shipment
          const shipmentResponse = await createShipment(formData[0]);
          // const shipmentResponse = { error: "Shipment Creation Failed" };

          if ("error" in shipmentResponse) {
            // Send Email To Developer About Shipment Creation Error
            if (developerEmail) {
              await sendEmail({
                to: developerEmail,
                subject: "Shipment Creation Error",
                html: `<p>Dear Developer! </br>Shipment Creation failed for Reference Number: ${data.referenceNumber}</p></br> Time: ${new Date().toISOString()}</p> </br> Details: <code><pre>${JSON.stringify(data, null, 2)}</pre></code>`,
              });
            }
            // throw new Error("Shipment Creation Failed");
            return NextResponse.json(
              {
                success: false,
                message: "Shipment Creation Failed",
                error: "Shipment Creation Failed",
              },
              { status: 500 }
            );
          }

          // ii) Send Confirmation Emails Sender & Receiver & Company
          await sendShipmentEmails({
            locales: formData[0].locale,
            data: {
              ...(shipmentResponse as ShipmentResponse),
              ...formData[0],
              shipmentId: (shipmentResponse as ShipmentResponse).id,
              trackingId: (shipmentResponse as ShipmentResponse).barcode,
              barcodeImageUrl: (shipmentResponse as ShipmentResponse).barcodeImage,
              expectedDeliveryDate: (shipmentResponse as ShipmentResponse).expectedDeliveryDate,
              senderBusinessName: formData[0].businessSenderName,
              shipmentType: formData[0].shipmentType as "COD" | "REGULAR",
            },
          });

          // iii) Save Shipment In Firestore
          await saveShipment({
            ...(shipmentResponse as ShipmentResponse),
            ...formData[0],
            shipmentId: (shipmentResponse as ShipmentResponse).id,
            trackingId: (shipmentResponse as ShipmentResponse).barcode,
            barcodeImageUrl: (shipmentResponse as ShipmentResponse).barcodeImage,
            expectedDeliveryDate: (shipmentResponse as ShipmentResponse).expectedDeliveryDate,
            senderBusinessName: formData[0].businessSenderName,
            shipmentType: formData[0].shipmentType as "COD" | "REGULAR",
          });
        } else {
          throw new Error("Error Getting Form Data From Firebase");
        }
      } catch (error) {
        console.log("Error Creating Shipment :: ", error);
        if (developerEmail) {
          sendEmail({
            to: developerEmail,
            subject: "Prolo Error :: Error Creating Shipment",
            html: `<pre><code>${JSON.stringify(error, null, 2)}</code></pre>`,
          });
        }
      }

      return NextResponse.json({ success: true, message: "Payment Processed Successfully" });

      // Save order as PAID
    } else {
      // ❌ Payment failed
      console.log("Payment Failed :: ", data);
      return NextResponse.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    sendEmail({
      to: process.env.DEVELOPER_EMAIL || "nuqtamenu@gmail.com",
      subject: "Error In PROLO Payment Webhook",
      html: `<pre><code>${JSON.stringify(error, null, 2)}</code></pre>`,
    });
    return NextResponse.json(
      { success: false, message: "Error processing payment", error },
      { status: 500 }
    );
  }
}
