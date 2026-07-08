import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pg from "pg";
const router = express.Router();
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// ── DOCTOR ROUTES (Google OAuth) ──────────────────────

// Step 1: redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Step 2: Google calls this after login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Generate JWT for doctor
    const token = jwt.sign(
      { id: req.user.id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
    );
    // Send token to frontend via URL
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  },
);

// ── PATIENT ROUTES (name + patient_code) ──────────────

// Patient login
router.post("/patient/login", async (req, res) => {
  const { name, patient_code } = req.body;
  try {
    // Find patient by name
    const result = await pool.query("SELECT * FROM ClDB WHERE name = $1", [
      name,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const patient = result.rows[0];

    // Compare patient_code with hashed version in DB
    const isMatch = await bcrypt.compare(patient_code, patient.patient_code);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT for patient
    const token = jwt.sign(
      { id: patient.id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Doctor creates a new patient with a patient_code
router.post("/patient/create", async (req, res) => {
  const { name, patient_code, service, price } = req.body;
  try {
    // Hash the patient_code before saving
    const hashedCode = await bcrypt.hash(patient_code, 10);

    const result = await pool.query(
      `INSERT INTO ClDB (name, patient_code, service, price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, hashedCode, service, price],
    );

    res.json({ message: "Patient created", patient: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
