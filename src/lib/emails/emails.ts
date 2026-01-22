// Build Subscription Emails
// Types
import {
  CreateShipmentFormData,
  PaymentCompanyEmailProps,
  PaymentCustomerEmailProps,
  PaymentLinkEmailProps,
} from "@/lib/types";
type EmailBuild = {
  customerEmail: string;
  companyEmail: string;
  customerEmailSubject: string;
  companyEmailSubject: string;
};

type ShipmentEmailBuilds = {
  // Sender
  senderEmailSubject: string;
  senderEmail: string;

  // Receiver
  receiverEmailSubject: string;
  receiverEmail: string;

  // Company
  companyEmailSubject: string;
  companyEmail: string;
};

import { ContactFormData, GetAQuoteFormData } from "../types";
import {
  buildCompanyContactEmailBody,
  buildCompanyPaymentEmailBody,
  buildCompanyQuoteEmailBody,
  buildCompanyShipEmailBody,
  buildCustomerContactEmailBody,
  buildCustomerPaymentEmailBody,
  buildCustomerPaymentLinkEmailBody,
  buildCustomerQuoteEmailBody,
  buildReceiverShipEmailBody,
  buildSenderShipEmailBody,
  SubscriptionEmailParams,
} from "./emailBodies";
type ContactEmailProps = {
  locales: "ar" | "en";
  data: ContactFormData;
};
// Functions
import {
  getEmailHeader,
  getEmailFooter,
  buildEmailBody,
  buildCustomerSubEmailBody,
  buildCompanySubEmailBody,
} from "./emailBodies";

// Subscription Email
export const buildSubscriptionEmails = (props: SubscriptionEmailParams): EmailBuild => {
  const header = getEmailHeader(props.locale);
  const footer = getEmailFooter(props.locale);
  const customerEmailBody = buildCustomerSubEmailBody(props.locale);
  const customerEmailSubject =
    props.locale === "en"
      ? "Welcome to PROLO Logistics – Subscription Confirmed"
      : "مرحبًا بك في برو لو – تم تأكيد الاشتراك";

  const companyEmailBody = buildCompanySubEmailBody(props.data);
  const companyEmailSubject = "إشعار اشتراك جديد | New Subscriber Notification";
  const customerEmail = buildEmailBody({
    locale: props.locale,
    header,
    footer,
    body: customerEmailBody,
  });

  const companyEmail = buildEmailBody({
    locale: "ar",
    header: getEmailHeader("ar"),
    footer: getEmailFooter("en"),
    body: companyEmailBody,
  });

  return { customerEmail, customerEmailSubject, companyEmail, companyEmailSubject };
};

// Contact Form Emails
export const buildContactEmails = ({ locales, data }: ContactEmailProps): EmailBuild => {
  const customerEmailSubject =
    locales === "en" ? "Thank You for Contacting PROLO Logistics" : "شكرًا لتواصلك مع برو لو";
  const companyEmailSubject = "طلب تواصل جديد | New Contact Request";

  const customerEmail = buildEmailBody({
    locale: locales,
    header: getEmailHeader(locales),
    footer: getEmailFooter(locales),
    body: buildCustomerContactEmailBody(locales, { ...data }),
  });

  const companyEmail = buildEmailBody({
    locale: locales,
    header: getEmailHeader("ar"),
    footer: getEmailFooter("ar"),
    body: buildCompanyContactEmailBody({ ...data }),
  });

  return { customerEmailSubject, companyEmailSubject, customerEmail, companyEmail };
};

// Get A Quote Form Emails
export const buildQuoteEmails = ({
  locales,
  data,
}: {
  locales: "en" | "ar";
  data: GetAQuoteFormData;
}): EmailBuild => {
  const customerEmailSubject =
    locales === "en"
      ? "Your Shipping Quote Request Has Been Received"
      : "تم استلام طلب عرض السعر الخاص بك";
  const companyEmailSubject = "طلب عرض سعر جديد | New Quote Request";

  const customerEmail = buildEmailBody({
    locale: locales,
    header: getEmailHeader(locales),
    footer: getEmailFooter(locales),
    body: buildCustomerQuoteEmailBody(locales, { ...data }),
  });

  const companyEmail = buildEmailBody({
    locale: locales,
    header: getEmailHeader("ar"),
    footer: getEmailFooter("ar"),
    body: buildCompanyQuoteEmailBody({ ...data }),
  });

  return { customerEmailSubject, companyEmailSubject, customerEmail, companyEmail };
};

// Create Shipment Form Emails
// export const buildShipmentEmails = ({locales: })
export const buildShipmentEmails = ({
  locales,
  data,
}: {
  locales: "en" | "ar";
  data: CreateShipmentFormData;
}): ShipmentEmailBuilds => {
  // Sender Email
  const senderEmailSubject =
    locales === "en"
      ? "Shipment Created Successfully – PROLO Logistics"
      : "تم إنشاء الشحنة بنجاح – برو لو";
  const senderEmail = buildEmailBody({
    locale: locales,
    header: getEmailHeader(locales),
    footer: getEmailFooter(locales),
    body: buildSenderShipEmailBody(locales, {
      ...data,
      destinationAddress:
        locales === "en" ? data.destinationAddressEnglish : data.destinationAddressArabic,
    }),
  });

  // Receiver Email
  const receiverEmailSubject =
    locales === "en" ? "Incoming Shipment – Track with PROLO" : "شحنة قادمة إليك – برو لو";

  const receiverEmail = buildEmailBody({
    locale: locales,
    header: getEmailHeader(locales),
    footer: getEmailFooter(locales),
    body: buildReceiverShipEmailBody(locales, {
      ...data,
      destinationAddress:
        locales === "en" ? data.destinationAddressEnglish : data.destinationAddressArabic,
    }),
  });

  // Company Email
  const companyEmailSubject = "إنشاء شحنة جديدة | New Shipment Created";
  const companyEmail = buildEmailBody({
    locale: "ar",
    header: getEmailHeader("ar"),
    footer: getEmailFooter("ar"),
    body: buildCompanyShipEmailBody({ ...data }),
  });

  return {
    senderEmailSubject,
    senderEmail,
    receiverEmailSubject,
    receiverEmail,
    companyEmailSubject,
    companyEmail,
  };
};

// PAYMENT EMAILS

// 1. Payment Link
export const buildPaymentLinkEmails = (props: PaymentLinkEmailProps) => {
  // Customer Emails
  const customerEmailSubject =
    props.locale === "ar" ? "رابط الدفع جاهز" : "Your Payment Link Is Ready";
  const customerEmail = buildEmailBody({
    locale: props.locale,
    body: buildCustomerPaymentLinkEmailBody(props),
    header: getEmailHeader(props.locale),
    footer: getEmailFooter(props.locale),
  });

  return { customerEmail, customerEmailSubject };
};

// 2. Payment (On Successfull Payment)
export const buildPaymentEmails = (
  props: PaymentCompanyEmailProps & PaymentCustomerEmailProps
): EmailBuild => {
  // Company Email
  const companyEmailSubject = "تم استلام دفعة جديدة | New Payment Received";
  const companyEmail = buildEmailBody({
    locale: "ar",
    body: buildCompanyPaymentEmailBody(props),
    header: getEmailHeader("ar"),
    footer: getEmailFooter("ar"),
  });

  // Customer Email
  const customerEmailSubject = props.locale === "ar" ? "تم تأكيد الدفع" : "Payment Confirmed";
  const customerEmail = buildEmailBody({
    locale: props.locale,
    header: getEmailHeader(props.locale),
    body: buildCustomerPaymentEmailBody(props),
    footer: getEmailFooter(props.locale),
  });

  return {
    // Company
    companyEmailSubject,
    companyEmail,

    // Customer
    customerEmailSubject,
    customerEmail,
  };
};
