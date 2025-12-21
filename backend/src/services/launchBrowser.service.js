import puppeteer from "puppeteer";

export const launchBrowser = async () => {
  console.log("Using Chrome at:", process.env.PUPPETEER_EXECUTABLE_PATH);

  return await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
};
