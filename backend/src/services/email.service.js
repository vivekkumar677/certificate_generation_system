
import fs from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
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
