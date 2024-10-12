import express from "express";
import envVar from "./utils/envVariable.js";
import connectToDatabase from "./utils/connectToDB.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is OK");
});

app.listen(envVar.port, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${envVar.port}`);
});
