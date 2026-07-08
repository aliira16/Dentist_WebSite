import e from "express";
import pool from "../db.js";

const router = e.Router();

router.get("/login-DrDash", async (req, res) => {
  const result = await pool.query("SELECT * FROM DrDB");
  res.json(result.rows);
});

router.post("/login-DrDash", async (req, res) => {
  const { name, phone_number, service, next_appointment, price } = req.body;
  if (!name || !phone_number || !service || !next_appointment || !price) {
    return res.status(400).json({ error: "need to fill all fields" });
  }

  const result = await pool.query(
    "INSERT INTO DrDB (name, phone_number, service, next_appointment, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, phone_number, service, next_appointment, price],
  );
  res.status(201).json(result.rows[0]);
});

router.put("/login-DrDash/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone_number, service, next_appointment, price } = req.body;

  const result = await pool.query(
    "UPDATE DrDB SET name = $1, phone_number = $2, service = $3, next_appointment = $4, price = $5 WHERE id = $6 RETURNING *",
    [name, phone_number, service, next_appointment, price, id],
  );
  res.json(result.rows[0]);
});

router.delete("/login-DrDash/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "DELETE FROM DrDB WHERE id = $1 RETURNING *",
    [id],
  );
  res.json(result.rows[0]);
});
