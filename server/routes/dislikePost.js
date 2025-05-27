/*
  server/routes/dislikePost.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { Router } from "express"
import db from "../db/db.js"
const router = Router()

router.post("/", (req, res) => {
  const { forumPostId, username } = req.body

  // Initial query, select from forumSocials (hasLiked and hasDisliked) where the post id and username are equal the request body
  db.query(
    "SELECT hasLiked, hasDisliked FROM forumSocials WHERE forumPostId = ? AND username = ?",
    [forumPostId, username],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message })

      // No record yet: add dislike
      if (results.length === 0) {
        db.query(
          "UPDATE forumPosts SET dislikes = dislikes + 1 WHERE forumPostId = ?",
          [forumPostId],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message })
            db.query(
              `INSERT INTO forumSocials (forumPostId, username, hasLiked, hasDisliked)
               VALUES (?, ?, FALSE, TRUE)`,
              [forumPostId, username],
              (err3) => {
                if (err3) return res.status(500).json({ error: err3.message })
                res.json({ success: true, like: 0, dislike: 1 })
              }
            )
          }
        )
      }
      // Already disliked: remove dislike (toggle off)
      else if (results[0].hasDisliked) {
        db.query(
          "UPDATE forumPosts SET dislikes = dislikes - 1 WHERE forumPostId = ? AND dislikes > 0",
          [forumPostId],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message })
            db.query(
              `UPDATE forumSocials SET hasDisliked = FALSE WHERE forumPostId = ? AND username = ?`,
              [forumPostId, username],
              (err3) => {
                if (err3) return res.status(500).json({ error: err3.message })
                res.json({ success: true, like: 0, dislike: 0 })
              }
            )
          }
        )
      }
      // Already liked: remove like, add dislike
      else if (results[0].hasLiked) {
        db.query(
          "UPDATE forumPosts SET likes = likes - 1, dislikes = dislikes + 1 WHERE forumPostId = ? AND likes > 0",
          [forumPostId],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message })
            db.query(
              `UPDATE forumSocials SET hasLiked = FALSE, hasDisliked = TRUE WHERE forumPostId = ? AND username = ?`,
              [forumPostId, username],
              (err3) => {
                if (err3) return res.status(500).json({ error: err3.message })
                res.json({ success: true, like: 0, dislike: 1 })
              }
            )
          }
        )
      }
      // Neither: add dislike
      else {
        db.query(
          "UPDATE forumPosts SET dislikes = dislikes + 1 WHERE forumPostId = ?",
          [forumPostId],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message })
            db.query(
              `UPDATE forumSocials SET hasLiked = FALSE, hasDisliked = TRUE WHERE forumPostId = ? AND username = ?`,
              [forumPostId, username],
              (err3) => {
                if (err3) return res.status(500).json({ error: err3.message })
                res.json({ success: true, like: 0, dislike: 1 })
              }
            )
          }
        )
      }
    }
  )
})

export default router
