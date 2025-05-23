/*
  server/routes/likePost.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { Router } from "express"
import db from "../db/db.js"

const router = Router()

router.post("/", (req, res) => {

  // Update the forumPosts table with the new amount of likes where the id of the forum post is equal to the one in the request body
  db.query(
    `UPDATE forumPosts SET likes=${req.body.likes} WHERE forumPostId=${req.body.forumPostId}`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      // Return results JSON object
      res.json(results)
    }
  )
})

export default router
