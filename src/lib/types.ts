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
