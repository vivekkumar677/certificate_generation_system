import puppeteer from "puppeteer";

export const launchBrowser = async () => {
  const browser = await puppeteer.launch({
    executablePath:
      process.env.CHROME_PATH || puppeteer.executablePath(), // <-- key fix
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
