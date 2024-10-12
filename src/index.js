import express from "express";
import envVar from "./utils/envVariable.js";
import connectToDatabase from "./utils/connectToDB.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is OK");
});
app.use("/api", indexRoutes);

app.listen(envVar.port, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${envVar.port}`);
});
