
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

export async function sendEmail(to, pdfPath, jpgPath) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to,
        subject: "Your Certificate",
        text: "Please find your certificate attached.",
        attachments: [
          { filename: "certificate.pdf", path: pdfPath },
          { filename: "certificate.jpg", path: jpgPath },
        ],
      },
      (err, info) => {
        if (err) return reject(err);
        resolve(info);
      }
    );
  });
}
