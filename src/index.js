import express from "express";
import cookieParser from "cookie-parser";
import envVar from "./utils/envVariable.js";
import connectToDatabase from "./services/connectToDB.js";
import indexRoutes from "./routes/index.routes.js";
import cors from "cors";
import responseHandler from "./middleware/responseHandler.js";

const app = express();
app.use(express.json());
app.use(responseHandler);
app.use(cookieParser());
app.use(cors({ origin: envVar.feUrl, credentials: true }));

app.get("/", (req, res) => {
  res.send("Máy chủ đang hoạt động");
});
app.use("/api", indexRoutes);

app.use((err, req, res, next) => {
  res.error(500, err.message || "Lỗi máy chủ");
});

app.listen(envVar.port, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${envVar.port}`);
});
