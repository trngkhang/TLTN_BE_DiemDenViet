import express from "express";
import cookieParser from "cookie-parser";
import envVar from "./utils/envVariable.js";
import connectToDatabase from "./utils/connectToDB.js";
import indexRoutes from "./routes/index.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: envVar.feUrl, credentials: true }));

app.get("/", (req, res) => {
  res.send("Server is OK");
});
app.use("/api", indexRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(envVar.port, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${envVar.port}`);
});
