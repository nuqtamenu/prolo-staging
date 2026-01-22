import { PaymentLinkRequest, PaymentLinkResponse } from "@/lib/types";
import axios from "axios";

export async function getPaymentLink(data: PaymentLinkRequest) {
  const paymentLinkResponse = await axios.post("/api/interpay/create-payment-link", data);

  if (paymentLinkResponse.data.success) {
    return paymentLinkResponse.data.paymentLinkData as PaymentLinkResponse;
  } else {
    return null;
  }
}
