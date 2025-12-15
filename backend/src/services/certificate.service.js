import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export async function generateCertificate(data) {
  const html = fs.readFileSync("src/templates/certificate.html", "utf8")
    .replace("{{name}}", data.name)
    .replace("{{business_name}}", data.business_name)
    .replace("{{gst_number}}", data.gst_number)
    .replace("{{business_address}}", data.business_address);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  const pdfPath = `cert_${Date.now()}.pdf`;
  const jpgPath = `cert_${Date.now()}.jpg`;

  await page.pdf({ path: pdfPath, format: "A4" });
  await page.screenshot({ path: jpgPath, fullPage: true });

  await browser.close();
  return { pdfPath, jpgPath };
}
