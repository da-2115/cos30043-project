import { Router } from "express";
import db from "../db/db.js";
import SqlString from 'sqlstring'

const router = Router()

router.post("/", (req, res) => {
  const query = SqlString.format(`UPDATE forumPosts SET title='${req.body.title}', contents='${req.body.contents}' WHERE forumPostId=${req.body.forumPostId}`)

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error creating post:", err);
      res.status(500).send("Error creating post");
    } else {
      res.status(201).send("Post created successfully");
    }
  });
});

export default router