import e from "express";
import pool from "../db.js";

const router = e.Router();

router.get("/login-ClDash", async (req, res) => {
  const result = await pool.query("SELECT * FROM ClDB");
  res.json(result.rows);
});

export default router;
