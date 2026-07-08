import e from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import pool from "./db.js";
import DrDash from "./routes/DrDash.routes.js";
import ClDash from "./routes/ClDash.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = e();

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(e.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use("/api/drdash", DrDash);
app.use("/api/CLdash", ClDash);
app.use("/api/auth", authRoutes);

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to the Dentist Website API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
