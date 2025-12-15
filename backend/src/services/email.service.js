import nodemailer from "nodemailer";

export async function sendEmail(email, pdf, jpg) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Certificate",
    text: "Please find attached certificate.",
    attachments: [
      { path: pdf },
      { path: jpg }
    ]
  });
}
