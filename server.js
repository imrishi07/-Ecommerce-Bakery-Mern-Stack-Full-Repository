import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRouter.js";
import categoryRoutes from "./routes/categoryRouter.js";
import productRoutes from "./routes/productRouter.js";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();

//fix dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Connect DB
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//Rest API
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
