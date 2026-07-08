import e from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import DrDash from "./routes/DrDash.routes.js";
import ClDash from "./routes/ClDash.routes.js";

dotenv.config();
const app = e();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(e.json());
app.use("/api/drdash", DrDash);
app.use("/api/CLdash", ClDash);

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to the Dentist Website API" });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
