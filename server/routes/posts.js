/*
  server/routes/posts.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { Router } from "express"
import db from "../db/db.js"

const router = Router()

// HTTP Get method for posts
router.get("/", (req, res) => {

  // Grab all data from forumPosts table
  db.query("SELECT * FROM forumPosts", (err, results) => {
    if (err) {
      // If an error has occured, return the error with a 500 error code
      return res.status(500).json({ error: err.message })
    }

    // Return results as JSON
    res.json(results)
  })
})

export default router
