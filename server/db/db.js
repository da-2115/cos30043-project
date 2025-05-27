/*
  server/db/db.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1

  Create DB Instance
  PLEASE NOTE: Password being plain text is usually considered bad practice.
  For the purposes of this project however, since the database is private (same with the API) I will use plain text.
  Use something like AWS Secrets Manager with the SDK for real world applications!
*/

import mysql from "mysql2"

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "pass12345",
  database: "iddDB",
  multipleStatements: true,
})

export default db
