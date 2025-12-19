import puppeteer, { executablePath } from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TMP_DIR = os.tmpdir();

export async function generateCertificate(data) {
  const templatePath = path.join(__dirname, "../templates/certificate.html");

  const html = fs
    .readFileSync(templatePath, "utf8")
    .replace("{{name}}", data.name)
    .replace("{{email}}", data.email)
    .replace("{{business_name}}", data.business_name)
    .replace("{{gst_number}}", data.gst_number)
    .replace("{{business_address}}", data.business_address);

    // commenting this file for now
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const timestamp = Date.now();
  const pdfPath = path.join(TMP_DIR, `${timestamp}_certificate.pdf`);
  const jpgPath = path.join(TMP_DIR, `${timestamp}_certificate.jpg`);

  await page.pdf({ path: pdfPath, format: "A4", printBackground: true });
  await page.screenshot({ path: jpgPath, fullPage: true });

  await browser.close();

  return { pdfPath, jpgPath };
}
