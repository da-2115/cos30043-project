/*
  server/routes/createComment.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { Router } from "express"
import db from "../db/db.js"
import SqlString from "sqlstring"

const router = Router()

router.post("/", (req, res) => {
  const { forumPostId, userPosted, commentText } = req.body

  // forumPostId is required
  if (!forumPostId) {
    return res.status(400).send("forumPostId is required")
  }

  // SQL Query to insert comment into db table forumComments
  const query = SqlString.format(`
        INSERT INTO forumComments (forumPostId, userPosted, commentText)
        VALUES (?, ?, ?)
      `)

  // Execute query, return response status
  db.query(query, [forumPostId, userPosted, commentText], (err, result) => {
    if (err) {
      console.error("Error creating comment:", err)
      res.status(500).send("Error creating comment")
    } else {
      res.status(201).send("Comment created successfully")
    }
  })
})

export default router
