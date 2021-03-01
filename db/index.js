const { Client } = require("pg");

const DB_NAME = "graceshopper";
const DB_URL = process.env.DATABASE_URL || `postgres://localhost/${DB_NAME}`;
const client = new Client({
  connectionString: DB_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined,
});

module.exports = {
    client
};