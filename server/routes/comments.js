/*
  server/routes/comments.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { Router } from "express"
import db from "../db/db.js"

const router = Router()

router.get("/", (req, res) => {
  // Get comments from forumComments table, return JSON response
  db.query("SELECT * FROM forumComments", (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: err.message })
    }

    res.json(results)
  })
})

export default router
