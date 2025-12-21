import puppeteer from "puppeteer";

export const launchBrowser = async () => {
    console.log("Puppeteer executable:", puppeteer.executablePath());
    const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
  return browser;
};
