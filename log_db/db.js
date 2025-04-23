// db.js
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets HTC",
  password: "4412106",
  port: 5432,
});

await db.connect(); // You can also handle errors here if needed
console.log("✅ Connected to PostgreSQL");

export default db;
