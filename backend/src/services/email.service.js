
// import fs from "fs";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
// });

// transporter.verify((err) => {
//   if (err) console.error("❌ Email setup failed:", err);
//   else console.log("✅ Email server ready");
// });

// export async function sendEmail(to, pdfPath, jpgPath) {
//   if (!fs.existsSync(pdfPath) || !fs.existsSync(jpgPath)) {
//     throw new Error("Certificates files not found");
//   }

//   return transporter.sendMail({
//     from: `"Certificate System" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: "Your Certificate",
//     text: "Please find your certificate attached.",
//     attachments: [
//       { filename: "certificate.pdf", path: pdfPath },
//       { filename: "certificate.jpg", path: jpgPath },
//     ],
//   });
// }


import fs from "fs";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function verifyEmailServer() {
  try {
    await resend.domains.list();
    console.log("✅ Email server ready (Resend connected)");
  } catch (err) {
    console.error("❌ Email server connection failed:", err.message);
  }
}

export async function sendEmail(to, pdfPath, jpgPath) {
  if (!fs.existsSync(pdfPath) || !fs.existsSync(jpgPath)) {
    throw new Error("Certificates files not found");
  }

  return await resend.emails.send({
    from: `Certificate System ${process.env.RESEND_API_KEY}`,
    to,
    subject: "Your Certificate",
    html: `
      <p>Hello,</p>
      <p>Congrats on sending your <strong>first email</strong>!</p>
      <p>Thank you.</p>
    `,
    attachments: [
      {
        filename: "certificate.pdf",
        content: fs.readFileSync(pdfPath).toString("base64"),
      },
      {
        filename: "certificate.jpg",
        content: fs.readFileSync(jpgPath).toString("base64"),
      },
    ],
  });
}
