import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { verifyEmailServer } from "./services/email.service.js";
import certificateRoutes from "./routes/certificate.routes.js";

dotenv.config();  
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("✅ Certificate Backend Running"));

app.use("/api/certificates", certificateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await verifyEmailServer();
});
export default app;
