/*
  server/routes/deletePost.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { Router } from "express"
import db from "../db/db.js"

const router = Router()

router.post("/", (req, res) => {
  // Delete post along with relations (socials and comments of the post)
  db.query(
    `DELETE FROM forumSocials WHERE forumPostId=${req.body.forumPostId}; DELETE FROM forumComments WHERE forumPostId=${req.body.forumPostId}; DELETE FROM forumPosts WHERE forumPostId=${req.body.forumPostId}`,
    (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
      }

      res.json(results)
    }
  )
})

export default router
