/*
  server/routes/editPost.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { Router } from "express"
import db from "../db/db.js"
import SqlString from "sqlstring"

const router = Router()

router.post("/", (req, res) => {
  // Query for editing post
  const query = SqlString.format(
    `UPDATE forumPosts SET title="${req.body.title}", contents="${req.body.contents}" WHERE forumPostId=${req.body.forumPostId}`
  )
  
  // Execute query, return HTTP response status
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error creating post:", err)
      res.status(500).send("Error creating post")
    } else {
      res.status(201).send("Post created successfully")
    }
  })
})

export default router
