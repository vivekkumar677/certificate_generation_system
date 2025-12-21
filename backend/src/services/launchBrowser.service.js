// import puppeteer from "puppeteer-core";
// import chromium from "@sparticuz/chromium";

// export const launchBrowser = async () => {
//   const chromePath = chromium.executablePath();
//   console.log("Using Chrome at:", chromePath);

//   return await puppeteer.launch({
//     executablePath: chromePath,
//     args: chromium.args,
//     headless: chromium.headless,
//     defaultViewport: chromium.defaultViewport,
//     // args: [
//     //   "--no-sandbox",
//     //   "--disable-setuid-sandbox",
//     //   "--disable-dev-shm-usage",
//     //   "--disable-gpu",
//     // ],
//   });
// };


import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

let browser; // singleton browser instance

export const getBrowser = async () => {
  if (browser && browser.isConnected()) return browser;

  try {
    browser = await puppeteer.launch({
      executablePath: chromium.executablePath(), // NO await here
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport,
    });
    console.log("✅ Chrome launched successfully");
    return browser;
  } catch (err) {
    console.error("❌ Failed to launch Chrome:", err);
    throw err;
  }
};
