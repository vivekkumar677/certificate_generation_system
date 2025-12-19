// test-email.js
import dotenv from "dotenv";
dotenv.config();

import { generateCertificate } from "./src/services/certificate.service.js";
import { sendEmail } from "./src/services/email.service.js";

async function testEmail() {
  try {
    // Dummy data for testing
    const data = {
      name: "John Doe",
      email: "ervivekkumar677@gmail.com", // Change to your email for testing
      business_name: "Acme Corp",
      gst_number: "12345ABCDE",
      business_address: "123 Main Street, City, Country",
    };

    // Generate certificate
    const { pdfPath, jpgPath } = await generateCertificate(data);
    console.log("✅ Certificate generated:", pdfPath, jpgPath);

    // Send email
    await sendEmail(data.email, pdfPath, jpgPath);
    console.log("✅ Test email sent successfully!");

  } catch (err) {
    console.error("❌ Email error:", err);
  }
}

// Run the test
testEmail();
