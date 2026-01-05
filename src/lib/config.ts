// Company Confirmation Emails
const COMPANY_QUOTE_EMAIL = process.env.COMPANY_QUOTE_EMAIL;
const COMPANY_CONTACT_EMAIL = process.env.COMPANY_CONTACT_EMAIL;
const COMPANY_SUBSCRIPTION_EMAIL = process.env.COMPANY_SUBSCRIPTION_EMAIL;
const COMPANY_SHIPMENT_EMAIL = process.env.COMPANY_SHIPMENT_EMAIL;
export const config = {
  companyQuoteEmailAddress: COMPANY_QUOTE_EMAIL,
  companyContactEmailAddress: COMPANY_CONTACT_EMAIL,
  companySubscriptionEmailAddress: COMPANY_SUBSCRIPTION_EMAIL,
  companyShipmentEmail: COMPANY_SHIPMENT_EMAIL,
};
