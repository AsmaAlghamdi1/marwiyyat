import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import placeRoutes from "./routes/place.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/place", placeRoutes);
app.use("/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("DDC API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});