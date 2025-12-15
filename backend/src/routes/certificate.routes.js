import express from "express";
import pool from "../db/index.js";
import { generateCertificate } from "../services/certificate.service.js";
import { sendEmail } from "../services/email.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, gst_number, business_name, business_address } = req.body;

    // Validate input
    if (!name || !email || !gst_number || !business_name || !business_address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert into DB, prevent duplicates by email
    let insertResult;
    try {
      insertResult = await pool.query(
        `INSERT INTO certificates(name,email,gst_number,business_name,business_address)
         VALUES($1,$2,$3,$4,$5)
         ON CONFLICT (email) DO NOTHING
         RETURNING id`,
        [name, email, gst_number, business_name, business_address]
      );
    } catch (dbErr) {
      console.error("Database Error:", dbErr);
      return res.status(500).json({ error: "Database insert failed", details: dbErr.message });
    }

    const certificateId =
      insertResult.rows.length > 0 ? insertResult.rows[0].id : null;

    if (!certificateId) {
      return res.status(200).json({
        message: "Certificate already exists for this email",
      });
    }

    // Generate certificate files
    let pdfPath, jpgPath;
    try {
      ({ pdfPath, jpgPath } = await generateCertificate({
        name,
        email,
        gst_number,
        business_name,
        business_address,
      }));
    } catch (certErr) {
      console.error("Certificate Generation Error:", certErr);
      return res.status(500).json({
        error: "Certificate generation failed",
        details: certErr.message,
      });
    }

    // Send certificate via email
    try {
      await sendEmail(email, pdfPath, jpgPath);
    } catch (emailErr) {
      console.error("Email Sending Error:", emailErr);
      return res.status(500).json({ error: "Email sending failed", details: emailErr.message });
    }

    res.status(201).json({ message: "Certificate sent successfully", certificateId });
  } catch (err) {
    console.error("Unexpected Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

router.get("/history", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM certificates ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error in /api/certificates:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

router.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error("Error in /api/certificates:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

export default router;
