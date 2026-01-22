import { PaymentLinkRequest } from "@/lib/types";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as PaymentLinkRequest;
    const baseUrl = process.env.INTERPAY_BASE_URL;
    const publicKey = process.env.INTERPAY_PUBLIC_KEY;
    const secretKey = process.env.INTERPAY_SECRET_KEY;

    if (!baseUrl || !publicKey || !secretKey) {
      throw new Error("Interpay configuration is missing");
    }

    const response = await axios.post(`${baseUrl}/api/v1/PaymentLinks/CreatePaymentLink`, data, {
      headers: {
        "Content-Type": "application/json",
        PublicKey: publicKey,
        SecretKey: secretKey,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment Link Created Successfully",
      paymentLinkData: response.data,
    });
  } catch (error) {
    console.error("Error creating payment link:", error);
    return NextResponse.json({
      success: false,
      message: "Payment Link Creation Failed",
      error,
    });
  }
}
