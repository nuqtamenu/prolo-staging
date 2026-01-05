export const css1 = `:root {
  --blue-hover: #12126d;
  --blue: #19199d;
  --white: #fefefe;
  --red: #e71039;
}

html {
  padding: 0px;
  margin: 0px;
}
body {
  max-width: 600px;
  margin-inline: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", Arial, Helvetica,
    sans-serif;
  padding: 0px;
  background-color: var(--white);
}

.underline {
  text-decoration: underline;
}

main {
  padding: 16px;
}

header {
  padding: 16px;
  background-color: var(--blue);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 150px;
}

.blue {
  color: var(--blue);
}

.logo {
  height: 30px;
  width: fit-content;
  margin-inline: auto;
}

h1 {
  font-size: 16px;
  text-align: center;
  margin-bottom: 0;
  font-weight: 600;
}

ul {
  margin: 0;
  padding-inline: 16px;
}

h2 {
  padding-inline: 16px;
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 0;
}

.title-sub {
  text-align: center;
  font-weight: 400;
  margin-top: 4px;
}

/* Data Table CSS */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 15px;
}

thead th {
  background-color: #f3f4f6;
  color: #111827;
  padding: 10px;
  border-bottom: 2px solid #e5e7eb;
}

tbody td {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

tbody tr:hover {
  background-color: #eef2f7;
}

.cta {
  margin-block: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn {
  padding-block: 6px;
  padding-inline: 18px;
  border-radius: 4px;
  text-decoration: none;
  border: none;
  transition: background 0.3s;
  font-size: 18px;
}

.translation-div {
  display: flex;
  align-content: center;
  gap: 8px;
}

.translation-div .translation {
  font-weight: normal;
  font-size: 0.7em;
  display: flex;
  align-items: center;
}

.primary {
  background-color: var(--blue);
  color: white;
}

.primary:hover {
  background-color: var(--blue-hover);
}

.secondary {
  border: 1px solid rgb(172, 170, 170);
  color: #000;
}

.secondary:hover {
  color: var(--white);
  background-color: var(--blue-hover);
}

.prolo {
  margin-top: -8px;
}

.footer-content {
  margin-top: 25px;
  background-color: var(--blue);
  color: var(--white);
  padding: 16px;
  font-size: 12px;
}

ul.contact {
  list-style: none;
}
ul.contact a {
  color: var(--white);
}

footer {
  text-align: center;
}

code {
  padding: 2px 4px;
  border-radius: 2px;
  background-color: rgba(193, 193, 193, 0.632);
}

.barcode {
  width: 200px;
  margin-inline: auto;
}

.section {
  margin-top: 24px;
}

.highlight {
  background-color: yellow;
  width: fit-content;
}
`;

export const css = `/* Reset */
html, body {
  padding: 0;
  margin: 0;
}

body {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, Helvetica, sans-serif;
  padding: 0;
  background-color: #fefefe;
}

/* Text */
.underline {
  text-decoration: underline;
}

h1 {
  font-size: 16px;
  text-align: center;
  margin-bottom: 0;
  font-weight: 600;
}

h2 {
  padding: 0 16px;
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 0;
}

.title-sub {
  text-align: center;
  font-weight: 400;
  margin-top: 4px;
}

/* Layout */
main {
  padding: 16px;
}

header {
  padding: 60px 16px;
  background-color: #19199d;
  color: #fefefe;
  text-align: center;
}

.logo {
  height: 30px;
  display: block;
  margin: 0 auto;
}

.blue {
  color: #19199d;
}

ul {
  margin: 0;
  padding: 0 16px;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 15px;
}

thead th {
  background-color: #f3f4f6;
  color: #111827;
  padding: 10px;
  border-bottom: 2px solid #e5e7eb;
}

tbody td {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

/* Hover not supported in most clients, omit */
tbody tr:hover {
  background-color: #eef2f7;
}

/* Buttons */
.cta {
  margin: 16px 0;
  text-align: center;
}

.btn {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 18px;
  margin: 0 4px;
}

.primary {
  background-color: #19199d;
  color: #ffffff;
}

a.primary {
  color: #ffffff;
}

.secondary {
  border: 1px solid #acaaaa;
  color: #000000;
  background-color: #ffffff;
}

/* Footer */
.footer-content {
  margin-top: 25px;
  background-color: #19199d;
  color: #fefefe;
  padding: 16px;
  font-size: 12px;
}

ul.contact {
  list-style: none;
  padding: 0;
}

ul.contact a {
  color: #fefefe;
  text-decoration: none;
}

footer {
  text-align: center;
}

/* Misc */
code {
  padding: 2px 4px;
  border-radius: 2px;
  background-color: #c1c1c1;
}

.barcode {
  width: 200px;
  display: block;
  margin: 0 auto;
}

.section {
  margin-top: 24px;
}

.highlight {
  background-color: yellow;
  display: inline-block;
}`;

export const englishHeader = `<header>
      <!-- Logo -->
      <img
        class="logo"
        src="https://prolo.sa/images/email/logo.png"
        alt="Prolo Professional Logistics"
      />
      <h1>Professional Logistics Platform</h1>
    </header>`;
export const arabicHeader = `<header>
      <!-- Logo -->
      <img
        class="logo"
        src="https://prolo.sa/images/email/logo.png"
        alt="Prolo Professional Logistics"
      />
      <h1>حلول احترافية متكاملة في الخدمات اللوجستية</h1>
    </header>`;

export const englishFooter = `<div class="footer-content">
      <p>
        PROLO is a professional logistics platform in Saudi Arabia, offering
        efficient shipment creation, tracking, and delivery management.
      </p>
      <ul class="contact">
        <li>
          📧 Email: <a href="mailto:info@adwar.com.sa">info@adwar.com.sa</a>
        </li>
        <li>📞 Phone: <a href="tel:+966558996861"> +966558996861</a></li>
        <li>🌐 Website: <a href="https://prolo.sa/en">prolo.sa</a></li>
      </ul>
      <br />
      <footer>© PROLO Logistics. All rights reserved.</footer>
    </div>`;
export const arabicFooter = `<div class="footer-content">
      <p>
        برولو هي منصة لوجستية احترافية في المملكة العربية السعودية، تقدم خدمات
        فعالة لإنشاء الشحنات وتتبعها وإدارة عمليات التسليم.
      </p>
      <ul class="contact">
        <li>
          📧 البريد الإلكتروني:
          <a href="mailto:info@adwar.com.sa">info@adwar.com.sa</a>
        </li>
        <li>
          📞 الهاتف:
          <a href="https://api.whatsapp.com/send?phone=966558996861"
            >966558996861</a
          >
        </li>
        <li>
          🌐 الموقع الإلكتروني: <a href="https://prolo.sa/en">prolo.sa</a>
        </li>
      </ul>
      <br />
      <footer>© بروبلو للخدمات اللوجستية. جميع الحقوق محفوظة.</footer>
    </div>`;
