import express from "express";
import Certificate from "../models/certificate.model.js";
import { generateCertificate } from "../services/certificate.service.js";
import { sendEmail } from "../services/email.service.js";

const router = express.Router();

// Create a new certificate
router.post("/", async (req, res) => {
  try {
    const { name, email, gst_number, business_name, business_address } = req.body;

    // Validate input
    if (!name || !email || !gst_number || !business_name || !business_address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if certificate already exists
    const existing = await Certificate.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "Certificate already exists for this email" });
    }

    // Create and save certificate in MongoDB
    const certificate = new Certificate({
      name,
      email,
      gst_number,
      business_name,
      business_address,
    });
    await certificate.save();

    // Generate certificate files
    const { pdfPath, jpgPath } = await generateCertificate({
      name,
      email,
      gst_number,
      business_name,
      business_address,
    });
    console.log("✅ Certificate generated:", pdfPath, jpgPath);

    // Send email with attachments
    await sendEmail(email, pdfPath, jpgPath);
    console.log("✅ Test email sent successfully!");

    res.status(201).json({ message: "Certificate sent successfully", certificateId: certificate._id });
  } catch (err) {
    console.error("❌ Full backend error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// Get all certificates
router.get("/history", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (err) {
    console.error("Error fetching certificates:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

export default router;
