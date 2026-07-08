import pg from "pg";
const { Pool } = pg;


const pool = new Pool({
  user: process.env.DBuser,
  host: process.env.DBhost,
  database: process.env.DBdatabase,
  password: process.env.DBpassword,
  port: process.env.DBport,
});

export default pool;
