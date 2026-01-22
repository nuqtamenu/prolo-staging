export type TrackingResponse = {
  // Core tracking info
  createdDate: string; // ISO string
  id: number;
  barcode: string;
  status: string;
  enStatus: string;
  arStatus: string;

  // Dates
  expectedDeliveryDate?: string; // Added: used in "Expected:" line

  // Package details
  description?: string;
  cod?: number;
  notes?: string; // Added: for test note

  // Sender
  senderFirstName?: string;
  senderPhone?: string; // Added: for phone number

  // Receiver
  receiverFirstName?: string;
  receiverPhone?: string; // Added: for phone number

  // Address
  destinationAddress?: {
    city?: string;
    arabicCityName?: string;
    village?: string; // Added: for Asira Al-Qibliya
    arabicVillageName?: string; // Added: for عصيرة القبلية
    region?: string;
    arabicRegionName?: string;
  };

  // Timeline
  deliveryRoute?: {
    name: string;
    arabicName: string;
    deliveryDate: string; // ISO string
  }[];

  // Company branding
  businessSenderName?: string; // Added: fallback to "شركة لوجستكس"
  customerLogo?: string; // Optional: for logo
};

export type TrackingError = {
  error: string;
};

export type ApiError = {
  error: string;
};

// Shipment Page Messages
// Payment Link
export type PaymentLinkTranslation = {
  linkGenerated: string;
  amountToPay: string;
  expiryNotice: string;
  successNote: string;
  shipmentCreated: string;
  emailNotification: string;
  supportNote: string;
  payNow: string;
  failedTitle: string;
  failedMessage: string;
};

export type ShipmentRequest = {
  email: string; // required
  password: string; // required
  pkgUnitType: "METRIC"; // write as it is
  pkg: {
    cod: string; // require
    notes?: string;
    senderName: string; // required
    receiverName: string; // required
    businessSenderName: string;
    senderPhone: string; // required
    senderPhone2?: string;
    receiverPhone: string; // required
    receiverPhone2?: string;
    serviceType: "STANDARD"; // required
    shipmentType: "COD" | "REGULAR" | "SWAP" | "BRING"; // required
    quantity?: number | string;
    description?: string;
  };
  destinationAddress: {
    addressLine1: string; // required
    addressLine2?: string;
    cityId: number | string; // required
    villageId: number | string; // required
    regionId: number | string; // required
  };
  originAddress: {
    addressLine1: string; // required
    addressLine2?: string;
    cityId: number | string; // required
    regionId: number | string; // required
    villageId: number | string; // required
  };
};

export type Address = {
  addressLine1: string;
  cityId: number;
  villageId: number;
  regionId: number;
};

export type CreateShipmentFormInputs = {
  // Step One Sender
  senderName: string;
  senderEmail: string;
  businessSenderName: string;
  senderPhone: string;
  originRegionId: string;
  originCityId: string;
  originVillageId: string;
  originAddressLine1: string;

  // Step 2 Receiver
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  destinationRegionId: string;
  destinationCityId: string;
  destinationVillageId: string;
  destinationAddressLine1: string;

  // Step 3 Shipment Description
  cod: string;
  notes: string;
  shipmentType: string;
  quantity: string;
  description: string;
};

export type ShipmentResponse = {
  id: number;
  barcode: string;
  barcodeImage: string;
  status: string;
  cod: number;
  createdDate: string;
  expectedDeliveryDate: string;
  senderPhone: string;
  receiverPhone: string;

  origin: {
    city: string | null;
    region: string | null;
    village: string | null;
    address: string | null;
  };

  destination: {
    city: string | null;
    region: string | null;
    village: string | null;
    address: string | null;
  };
};

export type ReportFile = {
  id: number;
  url: string;
  source: string | null;
};

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  city?: string;
  company?: string;
  message: string;
};

export type GetAQuoteFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  details: string;
};

export type CreateShipmentFormData = {
  // Sender
  senderName: string;
  senderEmail: string;
  senderBusinessName: string;
  originAddressArabic: string;
  originAddressEnglish: string;

  // Receiver
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  destinationAddressArabic: string;
  destinationAddressEnglish: string;

  // originAddress: string;
  // destinationAddress: string;

  // Shipment
  referenceNumber: string;
  shipmentId: string | number;
  trackingId: string | number;
  barcodeImageUrl: string;
  cod: string | number;
  senderPhone: string;
  shipmentType: "COD" | "REGULAR";
  quantity: number | string;
  notes: string;
  description: string;
  expectedDeliveryDate: string;
};

export type Addresses = {
  destinationAddress: {
    addressLine1: string;
    cityId: string;
    villageId: string;
    regionId: string;
  };
  originAddress: {
    addressLine1: string;
    cityId: string;
    regionId: string;
    villageId: string;
  };
};

export type EmailMessages = {
  header: { logoAlt: string };
  subscription: {
    customer: {
      heading: string;
      description: string;
      ctaText: string;
    };
    company: {
      heading: string;
      description: string;
      subscriberLabel: string;
      followUp: string;
      copyright: string;
    };
  };

  footer: {
    copyright: string;
    visitUs: string;
    companyInfo: string;
  };
};

// Shipment Form Data + PaymentId
// Shipment Data + PaymentId
export type PaymentLinkResponse = {
  id: string;
  paymentLink: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    reservationId: string | null;
    urlExpiry: string;
    referenceNumber: string;
    numericCurrencyCode: string;
    statusCode: number;
    amount: number;
    token: string;
    status: string;
    paymentLink: string;
    transactionId: string | null;
    responseCode: string | null;
    responseText: string | null;
    responseTextArabic: string | null;
    transactionDate: string | null;
    approvalCode: string | null;
    reason: string | null;
    reasonDescription: string | null;
    stan: string | null;
    rrNumber: string | null;
    type: string;
    cardBrand: string | null;
    expMonth: string | null;
    expYear: string | null;
    lastFourDigit: string | null;
    maskedPAN: string | null;
  };
  status: string;
  message: string;
};

export type PaymentLinkRequest = {
  firstName?: string;
  lastName?: string; // optional
  email?: string;
  urlExpiry: string; // ISO date string
  amount: number;
  currency: string;
  saveCard?: boolean;
  referenceNumber: string;
  reportingField1?: string; // optional
  reportingField2?: string; // optional
  reportingField3?: string; // optional
  reportingField4?: string; // optional
};

export type PaymentWebHookRequestBody = {
  referenceNumber?: string;
  paymentLinkId?: string;
  cOFToken?: string;
  transactionId: string;
  responseCode: string;
  responseText: string;
  transactionDate: string; // ISO date string
  approvalCode?: string;
  stan?: string;
  rrNumber?: string;
  type?: string; // e.g. "PAN"
  cardBrand?: string; // e.g. "VISA"
  expMonth?: string; // e.g. "12"
  expYear?: string; // e.g. "25"
  lastFourDigit?: string; // e.g. "1234"
  maskedPAN?: string; // e.g. "123456 ****** 1234"
};

export type PaymentWebHookResponse = {
  status: string;
  message: string;
};

export type DualLangAddresses = {
  destinationAddressArabic: string;
  destinationAddressEnglish: string;
  originAddressArabic: string;
  originAddressEnglish: string;
};

export type SaveFormAndPaymentReqBody = {
  formData: CreateShipmentFormInputs &
    DualLangAddresses & { paymentLinkId: string; referenceNumber: string; locale: "en" | "ar" };
  paymentLink: PaymentLinkResponse;
};

// EMAIL BODIES TYPES
// Payment Link
export type PaymentLinkEmailProps = {
  locale: "en" | "ar";
  senderName: string;
  referenceNumber: string;
  amount: number | string;
  paymentLink: string;
};

// Payment Email
export type PaymentCustomerEmailProps = {
  locale: "en" | "ar";
  senderName: string;
  referenceNumber: string;
  amount: string;
  transactionId: string;
};

export type PaymentCompanyEmailProps = {
  customerName: string;
  customerEmail: string;
  transactionId: string;
  referenceNumber: string;
  amount: string;
  timestamp: string;
};
