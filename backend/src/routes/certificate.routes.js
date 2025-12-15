import express from "express";
import pool from "../db/index.js";
import { generateCertificate } from "../services/certificate.service.js";
import { sendEmail } from "../services/email.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {name, email, gst_number, business_name, business_address} = req.body;

    // ----------Input validation
    if(!name || !email || !gst_number || !business_name || !business_address) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Insert into DB
    const insertQuery = 
      `INSERT INTO certificates(name,email,gst_number,business_name,business_address)
       VALUES($1,$2,$3,$4,$5) RETURNING id`;
    
    const result = await pool.query(insertQuery, [name, email, gst_number, business_name, business_address]);
    const certificateId = result.rows[0].id;

    // Generate certificate
    let pdfPath, jpgPath;
    try {
      ({ pdfPath, jpgPath } = await generateCertificate({ name, email, gst_number, business_name, business_address }));
    } catch (err) {
      console.error("Certificate generation failed:", err.message);
      return res.status(500).json({ error: "Certificate generation failed" });
    }

    // Send email
    try {
      await sendEmail(email, pdfPath, jpgPath);
    } catch (err) {
      console.error("Email sending failed:", err.message);
      return res.status(500).json({ error: "Failed to send email" });
    }

    // --- 5. Success response ---
    res.status(201).json({
      message: "Certificate sent successfully",
      certificateId
    });

  } catch (err) {
    console.error("Error in /api/certificates:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

export default router;
