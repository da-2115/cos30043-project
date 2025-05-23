import { Router } from "express";
import db from "../db/db.js";
import SqlString from 'sqlstring'

const router = Router()

router.post("/", (req, res) => {
    const { forumPostId, userPosted, commentText } = req.body;

    if (!forumPostId) {
        return res.status(400).send("forumPostId is required");
    }

    const query = SqlString.format(`
        INSERT INTO forumComments (forumPostId, userPosted, commentText)
        VALUES (?, ?, ?)
      `)

    db.query(query, [forumPostId, userPosted, commentText], (err, result) => {
        if (err) {
            console.error("Error creating comment:", err);
            res.status(500).send("Error creating comment");
        } else {
            res.status(201).send("Comment created successfully");
        }
    });
});

export default router