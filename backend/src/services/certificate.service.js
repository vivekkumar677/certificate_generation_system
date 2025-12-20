
// import puppeteer from "puppeteer"; // lighter than full puppeteer
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import os from "os";
// import { execSync } from "child_process";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const TMP_DIR = os.tmpdir();

// // Detect Chrome path based on OS
// function getChromePath() {
//   if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

//   const platform = process.platform;

//   if (platform === "win32") {
//     // Windows paths (default installation)
//     const winPaths = [
//       "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
//       "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
//       "C:\\Program Files\\Chromium\\Application\\chrome.exe",
//       "C:\\Program Files (x86)\\Chromium\\Application\\chrome.exe",
//     ];

//     for (const p of winPaths) {
//       try {
//         fs.accessSync(p, fs.constants.X_OK);
//         return p;
//       } catch (err) {
//         continue;
//       }
//     }
//   } else if (platform === "linux") {
//     const linuxPaths = [
//       "/usr/bin/chromium-browser",
//       "/usr/bin/chromium",
//       "/usr/bin/google-chrome",
//       "/usr/bin/google-chrome-stable",
//     ];
//     for (const p of linuxPaths) {
//       try {
//         execSync(`test -x ${p}`);
//         return p;
//       } catch (err) {
//         continue;
//       }
//     }
//   } else if (platform === "darwin") {
//     // macOS
//     const macPaths = [
//       "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
//       "/Applications/Chromium.app/Contents/MacOS/Chromium",
//     ];
//     for (const p of macPaths) {
//       try {
//         fs.accessSync(p, fs.constants.X_OK);
//         return p;
//       } catch (err) {
//         continue;
//       }
//     }
//   }

//   throw new Error(
//     "Chrome/Chromium executable not found. Install Chrome or set CHROME_PATH env variable."
//   );
// }

// export async function generateCertificate(data) {
//   const templatePath = path.join(__dirname, "../templates/certificate.html");

//   const html = fs
//     .readFileSync(templatePath, "utf8")
//     .replace("{{name}}", data.name)
//     .replace("{{email}}", data.email)
//     .replace("{{business_name}}", data.business_name)
//     .replace("{{gst_number}}", data.gst_number)
//     .replace("{{business_address}}", data.business_address);

//   const chromePath = getChromePath();
//   console.log("Using Chrome at:", chromePath);

//   const browser = await puppeteer.launch({
//     headless: true,
//     args: [
//       "--no-sandbox",
//       "--disable-setuid-sandbox",
//       "--disable-dev-shm-usage",
//       "--disable-gpu",
//     ],
//   });

//   const page = await browser.newPage();
//   await page.setContent(html, { waitUntil: "networkidle0" });

//   const timestamp = Date.now();
//   const pdfPath = path.join(TMP_DIR, `${timestamp}_certificate.pdf`);
//   const jpgPath = path.join(TMP_DIR, `${timestamp}_certificate.jpg`);

//   await page.pdf({ path: pdfPath, format: "A4", printBackground: true });
//   await page.screenshot({ path: jpgPath, fullPage: true });

//   await browser.close();

//   return { pdfPath, jpgPath };
// }


import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

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

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
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
