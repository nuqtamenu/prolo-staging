import { EmailMessages } from "@/lib/types";

export const getSubscritionEmailBody = (
  type: "company" | "customer",
  data: { email: string },
  locale: string,
  emailMessages: EmailMessages
): string => {
  const logoLink = "https://prolo.sa/logo-white.svg";
  const company = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>New Subscriber Notification - PROLO</title><style>body{margin:0;padding:0;font-family:Arial,sans-serif;background-color:#fefefe;color:#19199d}.email-container{max-width:600px;margin:auto;border:1px solid #ddd;background-color:#fff}.header{background-color:#19199d;text-align:center;padding:20px}.header img{max-width:150px}.body{padding:30px;text-align:left}.body h1{color:#e71039;font-size:22px;margin-bottom:20px;text-align:center}.body p{font-size:16px;line-height:1.5;margin-bottom:15px}.subscriber-box{border:1px solid #19199d;background-color:#fefefe;padding:15px;margin:20px 0;font-size:15px;color:#19199d}.footer{background-color:#19199d;color:#fefefe;text-align:center;padding:20px;font-size:13px}.footer a{color:#fefefe;text-decoration:underline}</style></head><body><div class="email-container"><div class="header"><a href="https://prolo.sa"><img src="${logoLink}" alt="${emailMessages.header.logoAlt}"></a></div><div class="body"><h1>${emailMessages.subscription.company.heading}</h1><p>${emailMessages.subscription.company.description}</p><div class="subscriber-box"><strong>${emailMessages.subscription.company.subscriberLabel}</strong>${data.email}</div><p>${emailMessages.subscription.company.followUp}</p></div><div class="footer"><p>${emailMessages.subscription.company.copyright}<br>${emailMessages.footer.visitUs}<a href="https://prolo.sa">prolo.sa</a></p></div></div></body></html>`;

  const customer = `<!DOCTYPE html><html lang="en"><head><style>body{margin:0;padding:0;font-family:Arial,sans-serif;background-color:#fefefe;color:#19199d}.email-container{max-width:600px;margin:auto;border:1px solid #ddd;background-color:#fff}.header{background-color:#19199d;text-align:center;padding:20px}.header img{max-width:150px}.body{padding:30px;text-align:center}.body h1{color:#e71039;font-size:24px;margin-bottom:20px}.body p{font-size:16px;line-height:1.5;margin-bottom:25px}.cta-button{display:inline-block;padding:12px 25px;background-color:#e71039;color:#fefefe;text-decoration:none;font-weight:700;border-radius:4px}.cta-button:hover{background-color:#c50d30}.footer{background-color:#19199d;color:#fefefe;text-align:center;padding:20px;font-size:13px}.footer a{color:#fefefe;text-decoration:underline}</style></head><body><div class="email-container"><div class="header"><a href="https://prolo.sa"><img src="${logoLink}" alt="${emailMessages.header.logoAlt}"></a></div><div class="body"><h1>${emailMessages.subscription.customer.heading}</h1><p>${emailMessages.subscription.customer.description}</p><a href="https://prolo.sa/${locale || "en"}/get-a-quote" class="cta-button">Get a Quote</a></div><div class="footer"><p>${emailMessages.footer.copyright}<br>${emailMessages.footer.visitUs}<a href="https://prolo.sa/${locale}">prolo.sa</a></p><p>${emailMessages.footer.companyInfo}</p></div></div></body></html>`;

  if (type === "company") {
    return company;
  }

  if (type === "customer") {
    return customer;
  }

  return "No Email Content";
};
