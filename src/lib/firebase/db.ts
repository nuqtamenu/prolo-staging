/**
 * Shipment Related
 * 1. Create & Read Shipment Form Data
 * 2. Create & Read Shipment Data
 *
 * Payments Related
 * 1. Create & Read Payments
 * 2. Create & Read Paid Payments
 *
 */

import {
  collection,
  addDoc,
  // updateDoc,
  doc,
  // deleteDoc,
  query,
  where,
  getDocs,
  getDoc,
  // writeBatch,
  // orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

/**
 * 1. Shipments
 *
 * Shipment Form Data : (READ & WRITE) $paymentId
 * Shipments (READ & WRITE)$paymentId
 *
 * 2. Payments
 * Payment Links : (READ & WRITE) $paymentLink $shipmentFormId
 * Payments: (READ & WRITE) $shipmentId
 */

// SHIPMENTS
import type {
  CreateShipmentFormInputs,
  CreateShipmentFormData,
  PaymentLinkResponse,
  PaymentWebHookRequestBody,
  DualLangAddresses,
} from "../types";

// 1. SHIPMENT FORM DATA

// Shipment Form Data (Write / Create)
export async function saveShipmentFormData(
  data: CreateShipmentFormInputs & { paymentLinkId: string } & DualLangAddresses
) {
  try {
    const docRef = await addDoc(collection(db, "shipment-form-data"), {
      ...data,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.log("Error Saving Shipment-Form-Data On Firebase :: Error ", error);
    return null;
  }
}

// Shipment Form Data (Read)
export async function readShipmentFormData(referenceNumber: string) {
  try {
    const q = query(
      collection(db, "shipment-form-data"),
      where("referenceNumber", "==", referenceNumber)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as CreateShipmentFormInputs & {
        paymentLinkId: string;
        referenceNumber: string;
        id: string;
        locale: "en" | "ar";
        createdAt: Date;
      } & DualLangAddresses;
    });
  } catch (error) {
    console.log("Error Read Shipment-Form-Data On Firebase :: Error ", error);
    return null;
  }
}

// 2. SHIPMENTS
// Shipments (Write / Create)
export async function saveShipment(
  data: CreateShipmentFormData & { paymentLinkId: string; referenceNumber: string }
) {
  try {
    const docRef = await addDoc(collection(db, "shipments"), {
      ...data,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.log("Error Saving Shipment On Firebase :: Error ", error);
    return null;
  }
}

// TODO: Shipment Read

// 3. PAYMENT LINKS
// Payment Link
export async function savePaymentLink(data: PaymentLinkResponse) {
  try {
    const docRef = await addDoc(collection(db, "payment-links"), {
      ...data,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.log("Error Saving Payment-Link On Firebase :: Error ", error);
    return null;
  }
}

// Payment Link (Read)
export async function readPaymentLink(paymentLinkId: string) {
  try {
    const docRef = doc(db, "payment-links", paymentLinkId);
    const paymentLink = await getDoc(docRef);

    return { id: paymentLink.id, ...paymentLink.data } as { id: string } & PaymentLinkResponse;
  } catch (error) {
    console.log("Error Read Payment Link On Firebase :: Error ", error);
    return null;
  }
}

// 4. PAYMENTS
export async function savePayment(data: PaymentWebHookRequestBody) {
  try {
    const docRef = await addDoc(collection(db, "payments"), {
      ...data,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.log("Error saving Payment on Firebase", error);
    return null;
  }
}
