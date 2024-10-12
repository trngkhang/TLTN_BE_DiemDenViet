import express from "express";
import envVar from "./utils/envVariable.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is OK");
});

app.listen(envVar.port, () => {
  console.log(`Server running on port ${envVar.port}`);
});
