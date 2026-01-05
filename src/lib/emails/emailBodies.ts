import { ContactFormData } from "../types";
import { englishFooter, englishHeader, arabicHeader, arabicFooter, css } from "./emailComponents";

type Locale = "ar" | "en";

type CustomerContactEmailBodyData = { name: string; email: string; phone: string };

export const getEmailHeader = (locale: Locale) => {
  if (locale === "ar") {
    return arabicHeader;
  }

  return englishHeader;
};
export const getEmailFooter = (locale: Locale) => {
  if (locale === "ar") {
    return arabicFooter;
  }

  return englishFooter;
};

export const buildEmailBody = ({
  locale,
  header,
  body,
  footer,
}: {
  locale: Locale;
  body: string;
  header: string;
  footer: string;
}) => {
  return `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
    ${css}
    </style>
  </head>
  <body dir="${locale === "ar" ? "rtl" : "ltr"}">
    <!-- Header -->
    ${header}

    <!-- Body -->
    ${body}

    <!-- Footer -->
    ${footer}
  </body>
</html>
`;
};

// SUBSCRIPTION EMAIL
export type SubscriptionEmailParams = {
  locale: Locale;
  data: {
    email: string;
  };
};
// Customer
export const buildCustomerSubEmailBody = (locale: Locale): string => {
  if (locale === "ar") {
    return `<main>
      <p>عميلنا العزيز!</p>
      <h2>شكرًا لاشتراكك في برولو</h2>
      <p>
        نحن سعداء بانضمامك إلينا. تم استلام اشتراكك بنجاح، وقد يتواصل فريقنا معك
        إذا كانت هناك حاجة إلى أي معلومات إضافية.
      </p>

      <p><b>مع برولو يمكنك:</b></p>
      <ul>
        <li>طلب عروض أسعار فورية للشحن</li>
        <li>إنشاء وإدارة الشحنات رقميًا</li>
        <li>تتبع عمليات التسليم في الوقت الفعلي</li>
        <li>طلب عروض أسعار فورية للشحن</li>
        <li>
          الاستفادة من منصة لوجستية حديثة وخالية من الأوراق مصممة خصيصًا للمملكة
          العربية السعودية
        </li>
      </ul>

      <!-- CTA -->
      <div class="cta">
        <a class="btn primary" href="https://prolo.sa/ar/get-a-quote"
          >احصل على عرض سعر</a
        >
        <a class="btn secondary" href="https://prolo.sa/ar/create-shipment"
          >إنشاء شحنة</a
        >
      </div>
      <p>إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا في أي وقت.</p>
      <p>مع أطيب التحيات،</p>
      <p class="prolo">
        <b>فريق بروبلو للخدمات اللوجستية</b>
      </p>
    </main>`;
  }

  return `<main>
      <p>Dear Customer!</p>
      <h2>Thank you for subscribing to PROLO</h2>
      <p>
        We’re excited to have you with us. Your subscription has been
        successfully received, and our team may contact you if any additional
        information is required.
      </p>

      <p><b>With PROLO, you can:</b></p>
      <ul>
        <li>Request instant shipping quotes</li>
        <li>Create and manage shipments digitally</li>
        <li>Track deliveries in real time</li>
        <li>Request instant shipping quotes</li>
        <li>
          Experience a modern, paperless logistics platform designed
          specifically for Saudi Arabia
        </li>
      </ul>

      <!-- CTA -->
      <div class="cta">
        <a class="btn primary" href="https://prolo.sa/en/get-a-quote"
          >Get a Quote</a
        >
        <a class="btn secondary" href="https://prolo.sa/en/create-shipment"
          >Create a Shipment</a
        >
      </div>
      <p>If you have any questions, feel free to reach out to us anytime.</p>
      <p>Warm regards,</p>
      <p class="prolo">
        <b>PROLO Logistics Team</b>
      </p>
    </main>`;
};
// Company
export const buildCompanySubEmailBody = ({ email }: { email: string }) => {
  return `<main>
      <section>
        <h2 dir="rtl" lang="ar">تم تسجيل اشتراك جديد في منصة برو لو</h2>
        <p class="title-sub">(A new user has subscribed to PROLO)</p>
      </section>

      <section>
        <h3 class="translation-div">
          <span>بيانات المشترك</span>
          <span class="translation">(Subscriber Details)</span>
        </h3>

        <table>
          <thead>
            <tr>
              <th>الحقل (Field)</th>
              <th>القيمة (Value)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>البريد الإلكتروني (Email)</td>
              <td>
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            <tr>
              <td>التاريخ (Date)</td>
              <td>${new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="translation-div">
        <p dir="rtl" lang="ar">يرجى المتابعة عند الحاجة.</p>
        <p class="translation">(Please follow up if required)</p>
      </section>
    </main>`;
};

// CONTACT FORM EMAIL
export type ContactEmailParams = {
  locale: Locale;
  data: {
    name: string;
    email: string;
    phone: string;
    city: string;
    company: string;
    message: string;
  };
};
// Customer
export const buildCustomerContactEmailBody = (
  locale: Locale,
  { name, email, phone }: CustomerContactEmailBodyData
) => {
  // Return Arabic Body Data
  if (locale === "ar") {
    return `
    <main>
      <p><b>عزيزي ${name}!</b></p>
      <p>لقد استلمنا طلبك للحصول على عرض سعر للشحن بخصوص الخدمة التالية:</p>
      <h2>شكرًا لتواصلك مع <span class="blue">بروبلو لوجستيك</span></h2>
      <p>
        لقد استلمنا رسالتك بنجاح. سيقوم فريق اللوجستيات لدينا بمراجعة طلبك
        والتواصل معك قريبًا عبر هذا البريد الإلكتروني (<span class="underline"
          >${email}</span
        >) أو رقم الاتصال الذي قدمته (<span class="underline">${phone}</span>)
        مع عرض سعر مخصص.
      </p>

      <p><b>وفي هذه الأثناء، يمكنك أيضًا المتابعة إلى:</b></p>

      <!-- دعوة لاتخاذ إجراء -->
      <div class="cta">
        <a class="btn primary" href="https://prolo.sa/${locale}/get-a-quote"
          >احصل على عرض سعر</a
        >
        <a class="btn secondary" href="https://prolo.sa/${locale}/create-shipment"
          >إنشاء شحنة</a
        >
      </div>

      <p>
        نحن نقدر اهتمامك
        <span class="blue">بروبلو لوجستيك</span>.
      </p>
      <p>مع أطيب التحيات،</p>
      <p class="prolo">
        <b>فريق بروبلو لوجستيك</b>
      </p>
    </main>`;
  }

  // Return English Body Data
  return `<main>
      <p><b>Dear ${name}!</b></p>
      <p>
        We’ve received your request for a shipping quote regarding the following
        service:
      </p>
      <h2>
        Thank you for contacting <span class="blue">Prolo Logistics</span>
      </h2>
      <p>
        We have successfully received your message. Our logistics team will
        review your request and contact you shortly via this email (<span
          class="underline"
          >${email}</span
        >) or your provided contact number (<span class="underline"
          >${phone}</span
        >) with a customized quotation.
      </p>

      <p><b>Meanwhile, you may also proceed to:</b></p>

      <!-- CTA -->
      <div class="cta">
        <a class="btn primary" href="https://prolo.sa/${locale}/get-a-quote"
          >Get A Quote</a
        >
        <a
          class="btn secondary"
          href="https://prolo.sa/${locale}/create-shipment"
          >Create a Shipment</a
        >
      </div>
      <p>
        We appreciate your interest in
        <span class="blue">Prolo Logistics</span>.
      </p>
      <p>Best regards,</p>
      <p class="prolo">
        <b>PROLO Logistics Team</b>
      </p>
    </main>`;
};
// Company
export const buildCompanyContactEmailBody = ({
  name,
  email,
  phone,
  city,
  company,
  message,
}: ContactFormData): string => {
  return `<main>
      <section>
        <h2 dir="rtl" lang="ar">قام أحد المستخدمين بطلب التواصل معكم.</h2>
        <p class="title-sub">(A user is requesting contact)</p>
      </section>

      <section>
        <h3 class="translation-div">
          <span>تفاصيل التواصل</span>
          <span class="translation">(Contact Details)</span>
        </h3>

        <table>
          <thead>
            <tr>
              <th>الحقل (Field)</th>
              <th>القيمة (Value)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>الاسم (Name)</td>
              <td>${name}</td>
            </tr>

            <tr>
              <td>البريد الإلكتروني (Email)</td>
              <td>
                <a href="mailto${email}:"
                  >${email}</a
                >
              </td>
            </tr>

            <tr>
              <td>المدينة (City)</td>
              <td>${city}</td>
            </tr>

            <tr>
              <td>رقم الهاتف (Phone)</td>
              <td><a href="tel:${phone}">${phone}</a></td>
            </tr>

            <tr>
              <td>الشركة (Company)</td>
              <td>${company}</td>
            </tr>

            <tr>
              <td>الرسالة (Message)</td>
              <td>${message}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="translation-div">
        <p dir="rtl" lang="ar">يرجى التواصل مع العميل في أقرب وقت.</p>
        <p class="translation">(Please reach out to the customer promptly)</p>
      </section>
    </main>`;
};

// GET A QUOTE FORM
export type GetAQuoteEmailParams = {
  locale: Locale;
  data: {
    service: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    details: string;
  };
};

// Customer
export const buildCustomerQuoteEmailBody = (
  locale: Locale,
  { name, email, service, phone }: { name: string; service: string; email: string; phone: string }
) => {
  // Arabic Email Body
  if (locale === "ar") {
    return `<main>
  <p>عزيزي ${name}!</p>
  <p>لقد استلمنا طلبك للحصول على عرض سعر للشحن بخصوص الخدمة التالية:</p>
  <p><b>الخدمة</b></p>
  <h2>${service}</h2>
  <p>
    شكرًا لاختيارك بروبلو . سيقوم فريق اللوجستيات لدينا بمراجعة طلبك والتواصل
    معك قريبًا عبر هذا البريد الإلكتروني (<span class="underline">${email}</span
    >) أو رقم الاتصال الذي قدمته (<span class="underline">${phone}</span>) مع
    عرض سعر مخصص.
  </p>

  <p><b>وفي هذه الأثناء، يمكنك أيضًا المتابعة إلى:</b></p>

  <!-- CTA -->
  <div class="cta">
    <a class="btn primary" href="https://prolo.sa/ar/create-shipment"
      >إنشاء شحنة</a
    >
  </div>

  <p>إذا كان لديك أي أسئلة، لا تتردد في التواصل معنا في أي وقت.</p>
  <p>مع أطيب التحيات،</p>
  <p class="prolo">
    <b>فريق بروبلو اللوجستي</b>
  </p>
</main>
`;
  }

  // English Email Body
  return `<main>
  <p>Dear ${name}!</p>
  <p>
    We’ve received your request for a shipping quote regarding the following
    service:
  </p>
  <p><b>Service</b></p>
  <h2>${service}</h2>
  <p>
    Thank you for choosing PROLO. Our logistics team will review your request
    and contact you shortly via this email (<span class="underline"
      >${email}</span
    >) or your provided contact number (<span class="underline">${phone}</span>)
    with a customized quotation.
  </p>

  <p><b>Meanwhile, you may also proceed to:</b></p>

  <!-- CTA -->
  <div class="cta">
    <a class="btn primary" href="https://prolo.sa/en/create-shipment"
      >Create a Shipment</a
    >
  </div>
  <p>If you have any questions, feel free to reach out to us anytime.</p>
  <p>Warm regards,</p>
  <p class="prolo">
    <b>PROLO Logistics Team</b>
  </p>
</main>
`;
}; // EN/AR
// Company
export const buildCompanyQuoteEmailBody = ({
  service,
  name,
  email,
  phone,
  address,
  details,
}: {
  service: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  details: string;
}) => {
  return `<main>
  <section>
    <h2 dir="rtl" lang="ar">
      قدّم أحد العملاء طلب عرض سعر
      <span class="blue">${service}</span>
    </h2>
    <p class="title-sub">
      (A customer has submitted a quote request for a service)
    </p>
  </section>

  <section>
    <h3 class="translation-div">
      <span>تفاصيل الطلب</span>
      <span class="translation">(Quote Details)</span>
    </h3>

    <table>
      <thead>
        <tr>
          <th>الحقل (Field)</th>
          <th>القيمة (Value)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>الاسم (Name)</td>
          <td>${name}</td>
        </tr>

        <tr>
          <td>البريد الإلكتروني (Email)</td>
          <td>
            <a href="mailto:${email}">${email}</a>
          </td>
        </tr>

        <tr>
          <td>رقم الهاتف (Phone)</td>
          <td><a href="tel:${phone}">${phone}</a></td>
        </tr>

        <tr>
          <td>العنوان (Address)</td>
          <td>${address}</td>
        </tr>
        <tr>
          <td>خدمة (Service)</td>
          <td class="blue">${service}</td>
        </tr>

        <tr>
          <td>تفاصيل إضافية (Additional Details)</td>
          <td>${details}</td>
        </tr>

        <tr>
          <td>التاريخ (Date)</td>
          <td>
            ${new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })}
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="translation-div">
    <p dir="rtl" lang="ar">يرجى التواصل مع العميل لإتمام عرض السعر</p>
    <p class="translation">
      (Please contact the customer for quotation processing)
    </p>
  </section>
</main>
`;
};

// CREATE A SHIPMENT FORM
export type CreateShipmentEmailParams = {
  locale: Locale;
  data: {
    //Sender Details
    senderName: string;
    senderEmail: string;
    senderPhone: string;
    originAddressArabic: string;
    originAddressEnglish: string;

    // Receiver Details
    receiverName: string;
    receiverEmail: string;
    receiverPhone: string;
    destinationAddressArabic: string;
    destinationAddressEnglish: string;

    // Shipment Details
    shipmentType: string;
    cod: string;
    shipmentId: string;
    trackingId: string;
    barcodeImageUrl: string;
    description: string;
    notes: string;
  };
};
// Sender
export const buildSenderShipEmailBody = (
  locale: Locale,
  {
    senderName,
    shipmentId,
    trackingId,
    barcodeImageUrl,
    receiverName,
    destinationAddress,
    expectedDeliveryDate,
    shipmentType,
    cod,
  }: {
    senderName: string;
    shipmentId: string | number;
    trackingId: string | number;
    barcodeImageUrl: string;
    receiverName: string;
    destinationAddress: string;
    expectedDeliveryDate: string;
    shipmentType: "COD" | "REGULAR";
    cod: string | number;
  }
) => {
  if (locale === "ar") {
    return `<main dir="rtl">
  <p><b>عزيزي ${senderName}!</b></p>

  <h2>
    تهانينا! 🎉 <br />
    تم إنشاء شحنتك بنجاح.
  </h2>

  <h3>تفاصيل الشحنة:</h3>
  <ul>
    <li>معرّف الشحنة: <code>${shipmentId}</code></li>
    <li>معرّف التتبع: <code>${trackingId}</code></li>
  </ul>

  <div>
    <h3>📦 الباركود:</h3>
    <img class="barcode" src="${barcodeImageUrl}" alt="صورة باركود الشحنة" />
  </div>

  <div>
    <h3>ما التالي؟</h3>

    <ul>
      <li>تتبع شحنتك في الوقت الفعلي</li>
      <li>اطبع ملصق الشحن الخاص بك</li>
      <li>قم بإدارة التسليم رقمياً مع <b class="blue">Prolo</b></li>
    </ul>
  </div>

  <!-- CTA -->
  <div class="cta">
    <a class="btn primary" href="https://prolo.sa/ar/tracking/${trackingId}"
      >تتبع شحنتك</a
    >
    <a
      class="btn secondary"
      href="https://prolo.sa/ar/create-shipment/success?barcode=${trackingId}&id=${shipmentId}"
      >اطبع الملصق</a
    >
  </div>

  <div class="section">
    <h3>معلومات التسليم:</h3>
    <p>
      سيتم تسليم شحنتك إلى
      <span class="underline">${receiverName}</span>
    </p>

    <ul>
      <li><b>📍 عنوان الوجهة:</b> ${destinationAddress}</li>
      <li>📅 تاريخ التسليم المتوقع: ${expectedDeliveryDate}</li>
    </ul>
  </div>

  <div class="section">
    <h3>معلومات إضافية</h3>
    <ul>
      <li>نوع الشحنة: <code>${shipmentType}</code></li>
      <li>مبلغ الدفع عند الاستلام: <code>${cod} ريال سعودي</code></li>
    </ul>
  </div>

  <p>شكراً لاختيارك <b class="blue">برولو </b></p>
  <p>مع أطيب التحيات،</p>
  <p class="prolo">
    <b>فريق برولو </b>
  </p>
</main>`;
  }

  return `<main dir="ltr">
      <p><b>Dear ${senderName}!</b></p>

      <h2>
        Congratulations! 🎉 <br />
        Your shipment has been successfully created.
      </h2>

      <h3>Shipment Details:</h3>
      <ul>
        <li>Shipment ID: <code>${shipmentId}</code></li>
        <li>Tracking ID: <code>${trackingId}</code></li>
      </ul>

      <div>
        <h3>📦 Barcode:</h3>
        <img
          class="barcode"
          src="${barcodeImageUrl}"
          alt="Shipment Barcode Image"
        />
      </div>

      <div>
        <h3>What’s Next?</h3>

        <ul>
          <li>Track your shipment in real time</li>
          <li>Print your shipping label</li>
          <li>Manage delivery digitally with <b class="blue">Prolo</b></li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="cta">
        <a class="btn primary" href="https://prolo.sa/en/tracking/${trackingId}">Track Your Shipment</a>
        <a class="btn secondary" href="https://prolo.sa/en/create-shipment/success?barcode=${trackingId}&id=${shipmentId}">Print Label</a>
      </div>

      <div class="section">
        <h3>Delivery Information:</h3>
        <p>
          Your shipment will be delivered to
          <span class="underline">${receiverName}</span>
        </p>

        <ul>
            <li><b>📍 Destination Address:</b>${destinationAddress}</li>
            <li>📅 Expected Delivery Date:</b>${expectedDeliveryDate}</li>
        </ul>
      </div>

      <div class="section">
        <h3>Additional Information</h3>
        <ul>
          <li>Shipment Type : <code>${shipmentType}</code></li>
          <li>COD Amount : <code>${cod} SAR</code></li>
        </ul>
      </div>

      <p>Thank you for choosing <b class="blue">Prolo Logistics.</b></p>
      <p>Best regards,</p>
      <p class="prolo">
        <b>PROLO Logistics Team</b>
      </p>
    </main>
`;
}; // EN/AR

// Receiver
export const buildReceiverShipEmailBody = (
  locale: Locale,
  {
    senderName,
    shipmentId,
    trackingId,
    receiverName,
    destinationAddress,
    expectedDeliveryDate,
    company,
    cod,
  }: {
    senderName: string;
    shipmentId: string | number;
    trackingId: string | number;
    barcodeImageUrl: string;
    receiverName: string;
    destinationAddress: string;
    expectedDeliveryDate: string;
    shipmentType: "COD" | "REGULAR";
    company?: string;

    cod: string | number;
  }
) => {
  if (locale === "ar") {
    return `<main>
  <p><b>عزيزي ${receiverName}'?،</b></p>
  <p>أطيب التحيات من <b>برولو</b>! 🚚</p>

  <h2>
    تم إنشاء شحنة جديدة لك بنجاح بواسطة
    <span class="blue">${company || senderName}</span>
  </h2>

  <div class="section">
    <h3>📦 معلومات الشحنة</h3>
    <table>
      <tbody>
        <tr>
          <td>معرّف الشحنة</td>
          <td><code> ${shipmentId}</code></td>
        </tr>

        <tr>
          <td>رقم التتبع</td>
          <td><code>${trackingId}</code></td>
        </tr>

        <tr>
          <td>الدفع عند الاستلام (COD)</td>
          <td><code>${cod} ريال سعودي</code></td>
        </tr>

        <tr>
          <td>📅 تاريخ التسليم المتوقع</td>
          <td>${expectedDeliveryDate}</td>
        </tr>

        <tr>
          <td>📍 عنوان الوجهة</td>
          <td>${destinationAddress}</td>
        </tr>

        <tr>
          <td>تاريخ الإنشاء</td>
          <td>
            ${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>يرجى التأكد من التواجد في عنوان التسليم في التاريخ المتوقع.</p>

  <!-- CTA -->
  <div class="cta">
    <a class="btn primary" href="https://prolo.sa/ar/tracking/${trackingId}"
      >تتبع شحنتك</a
    >
    <a class="btn secondary" href="https://prolo.sa/ar/contact">اتصل بالدعم</a>
  </div>

  <p>
    شكراً لاختيارك <b class="blue">برولو</b>. نحن ملتزمون بتسليم شحنتك بأمان وفي
    الوقت المحدد.
  </p>
  <p>مع أطيب التحيات،</p>
  <p class="prolo">
    <b>فريق برولو</b>
  </p>
</main>
`;
  }

  return `<main>
  <p><b>Dear ${receiverName},</b></p>
  <p>Warm greetings from <b>Prolo Logistics</b>! 🚚</p>

  <h2>
    A new shipment has been successfully created for you by
    <span class="blue">${company || senderName}</span>.
  </h2>

  <div class="section">
    <h3>📦 Shipment Information</h3>
    <table>
      <tbody>
        <tr>
          <td>Shipment ID</td>
          <td><code>${shipmentId}</code></td>
        </tr>

        <tr>
          <td>Tracking Number</td>
          <td><code>${trackingId}</code></td>
        </tr>

        <tr>
          <td>Cash on Delivery (COD)</td>
          <td><code>${cod} SAR</code></td>
        </tr>

        <tr>
          <td>Expected Delivery Date</td>
          <td>${expectedDeliveryDate}</td>
        </tr>

        <tr>
          <td>Destination Address</td>
          <td>${destinationAddress}</td>
        </tr>

        <tr>
          <td>Created At</td>
          <td>
            ${new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>
    Please ensure availability at the delivery address on the expected date.
  </p>
  <!-- CTA -->
  <div class="cta">
    <a class="btn primary" href="https://prolo.sa/en/tracking/${trackingId}"
      >Track Your Shipment</a
    >
    <a class="btn secondary" href="https://prolo.sa/en/contact"
      >Contact Support</a
    >
  </div>

  <p>
    Thank you for choosing <b class="blue">Prolo Logistics</b>. We are committed
    to delivering your package safely and on time.
  </p>
  <p>Best regards,</p>
  <p class="prolo">
    <b>PROLO Logistics Team</b>
  </p>
</main>
`;
}; // EN/AR

// Company
export const buildCompanyShipEmailBody = ({
  // Sender
  senderName,
  senderEmail,
  senderPhone,
  originAddressArabic,
  originAddressEnglish,

  // Receiver
  receiverName,
  destinationAddressArabic,
  destinationAddressEnglish,
  receiverEmail,
  receiverPhone,

  // Shipment Details
  shipmentId,
  trackingId,
  barcodeImageUrl,
  shipmentType,
  cod,
  description,
  notes,
  quantity,
}: {
  //Sender Details
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  originAddressArabic: string;
  originAddressEnglish: string;

  // Receiver Details
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  destinationAddressArabic: string;
  destinationAddressEnglish: string;

  // Shipment Details
  shipmentType: "COD" | "REGULAR";
  cod: string | number;
  shipmentId: string | number;
  trackingId: string | number;
  barcodeImageUrl: string;
  description: string;
  notes: string;
  quantity: string | number;
}) => {
  return `<main>
  <section>
    <h2 dir="rtl" lang="ar">تم إنشاء شحنة جديدة على منصة برو لو.</h2>
    <p class="title-sub" lang="en" dir="ltr">
      (A new shipment has been created on the PROLO platform.)
    </p>
  </section>

  <section>
    <h3 dir="rtl" lang="ar">
      تفاصيل الشحنة
      <span class="translation">(Shipment Details)</span>:
    </h3>
    <ul>
      <li>
        معرّف الشحنة
        <span class="translation">(Shipment ID)</span>:
        <code>${shipmentId}</code>
      </li>
      <li>
        معرّف التتبع
        <span class="translation">(Tracking ID)</span>:
        <code>${trackingId}</code>
      </li>
      <li>
        وصف محتوى الشحنة
        <span class="translation">(Package Description)</span>:
        <code>${description}</code>
      </li>
    </ul>
  </section>

  <section>
    <h3 class="translation-div">
      <span lang="ar" dir="rtl">ملاحظات الشحنة</span>
      <span>(Notes)</span>:
    </h3>
    <p class="highlight">${notes}</p>
  </section>

  <section>
    <h3 dir="rtl" lang="ar">
      📦 الباركود
      <span>(Barcode)</span>:
    </h3>
    <img
      class="barcode"
      src="${barcodeImageUrl}"
      alt="صورة باركود الشحنة (Shipment Barcode Image)"
    />
  </section>

  <section>
    <h3 class="translation-div">
      <span lang="ar" dir="rtl">بيانات المرسل</span>
      <span>(Sender Details)</span>
    </h3>
    <table>
      <tbody>
        <tr>
          <td>
            الاسم
            <span class="translation">(Name)</span>
          </td>
          <td>${senderName}</td>
        </tr>

        <tr>
          <td>
            البريد الإلكتروني
            <span class="translation">(Email)</span>
          </td>
          <td>
            <a href="mailto:${senderEmail}"> ${senderEmail} </a>
          </td>
        </tr>

        <tr>
          <td>
            رقم الهاتف
            <span class="translation">(Phone)</span>
          </td>
          <td>
            <a href="tel:05123456789">${senderPhone}</a>
          </td>
        </tr>

        <tr>
          <td>
            عنوان الإرسال
            <span class="translation">(Origin Address)</span>
          </td>
          <td>
            ${originAddressArabic}
            <br />
            <span class="translation"> ${originAddressEnglish} </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- Receiver Information -->
  <section>
    <h3 class="translation-div">
      <span lang="ar" dir="rtl">بيانات المستلم</span>
      <span>(Receiver Details)</span>
    </h3>
    <table>
      <tbody>
        <tr>
          <td>
            الاسم
            <span class="translation">(Name)</span>
          </td>
          <td>${receiverName}</td>
        </tr>

        <tr>
          <td>
            البريد الإلكتروني
            <span class="translation">(Email)</span>
          </td>
          <td>
            <a href="mailto:${receiverEmail}"> ${receiverEmail} </a>
          </td>
        </tr>

        <tr>
          <td>
            رقم الهاتف
            <span class="translation">(Phone)</span>
          </td>
          <td>
            <a href="tel:05123456789">${receiverPhone}</a>
          </td>
        </tr>

        <tr>
          <td>
            عنوان الاستلام
            <span class="translation">(Destination Address)</span>
          </td>
          <td>
            ${destinationAddressArabic}
            <br />
            <span class="translation"> (${destinationAddressEnglish}) </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- Shipment Information -->
  <section>
    <h3 class="translation-div">
      <span lang="ar" dir="rtl">معلومات الشحنة</span>
      <span>(Shipment Information)</span>
    </h3>

    <table>
      <tbody>
        <tr>
          <td>
            نوع الشحنة
            <span class="translation">${shipmentType}</span>
          </td>
          <td>COD</td>
        </tr>
        <tr>
          <td>
            مبلغ الدفع عند الاستلام
            <span class="translation">(COD Amount)</span>
          </td>
          <td>${cod} ريال سعودي</td>
        </tr>
        <tr>
          <td>
            الكمية
            <span class="translation">(Quantity)</span>
          </td>
          <td>${quantity}</td>
        </tr>
        <tr>
          <td>
            تاريخ الإنشاء
            <span class="translation">(Created At)</span>
          </td>
          <td>
            ${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}
            <span data="ltr" lang="en"
              >(${new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })})</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="translation-div">
    <p dir="rtl" lang="ar">يرجى متابعة الإجراءات التشغيلية.</p>
    <p lang="en" dir="ltr">(Please proceed with operational handling.)</p>
  </section>
</main>`;
};
