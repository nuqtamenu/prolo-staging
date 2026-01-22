export function createShipmentReference(locale: "ar" | "en") {
  // like: REF[locale][RANDOM-NUMBER][TIMESTAMP]
  const randomNum = Math.floor(Math.random() * 1000000);
  const timestamp = Date.now();
  return `REF${locale}${randomNum}${timestamp}`;
}
