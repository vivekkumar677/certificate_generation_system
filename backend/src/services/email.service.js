
import fs from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

transporter.verify((err) => {
  if (err) console.error("❌ Email setup failed:", err);
  else console.log("✅ Email server ready");
});

export async function sendEmail(to, pdfPath, jpgPath) {
  if (!fs.existsSync(pdfPath) || !fs.existsSync(jpgPath)) {
    throw new Error("Certificates files not found");
  }

  return transporter.sendMail({
    from: `"Certificate System" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Certificate",
    text: "Please find your certificate attached.",
    attachments: [
      { filename: "certificate.pdf", path: pdfPath },
      { filename: "certificate.jpg", path: jpgPath },
    ],
  });
}
