import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const launchBrowser = async () => {
  console.log("Using Chrome at:", chromium.executablePath());

  return await puppeteer.launch({
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
    // args: [
    //   "--no-sandbox",
    //   "--disable-setuid-sandbox",
    //   "--disable-dev-shm-usage",
    //   "--disable-gpu",
    // ],
  });
};
