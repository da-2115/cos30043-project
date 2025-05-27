/*
  server/routes/getPostsById.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { Router } from "express"
import db from "../db/db.js"

const router = Router()

router.get("/", (req, res) => {
  const postId = req.params.id

  // Get the post by id (forumPostId)
  const query = "SELECT * FROM forumPosts WHERE forumPostId = ?"

  // Execute query, return response status
  db.query(query, [postId], (err, results) => {
    if (err) {
      console.error("Error fetching post:", err)
      res.status(500).send("Error fetching post")
    } else if (results.length === 0) {
      res.status(404).send("Post not found")
    } else {
      res.json(results[0]) // Return the first (and only) result
    }
  })
})

export default router
