import express from "express";
import cookieParser from "cookie-parser";
import envVar from "./utils/envVariable.js";
import connectToDatabase from "./services/connectToDB.js";
import indexRoutes from "./routes/index.routes.js";
import cors from "cors";
import responseHandler from "./middlewares/responseHandler.js";

const app = express();
app.use(express.json());
app.use(responseHandler);
app.use(cookieParser());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://tltn-fe-diem-den-viet.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    return res.status(204).end(); // Không gửi thêm body
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Máy chủ đang hoạt động");
});
app.use("/api", indexRoutes);

app.use((err, req, res, next) => {
  res.error(500, err.message || "Lỗi máy chủ");
});

const start = async () => {
  await connectToDatabase();
  app.listen(envVar.port, async () => {
    console.log(`Server running on port ${envVar.port}`);
  });
};
start();
