import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique constraint
    gst_number: { type: String, required: true },
    business_name: { type: String, required: true },
    business_address: { type: String, required: true },
  },
  { timestamps: true }
);

// Ensure unique index exists in MongoDB
certificateSchema.index({ email: 1 }, { unique: true });

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
