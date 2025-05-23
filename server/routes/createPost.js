import { Router } from "express";
import db from "../db/db.js";
import SqlString from 'sqlstring'

const router = Router()

router.post("/", (req, res) => {
    const { userPosted, categoryId, title, contents, likes, dislikes } = req.body;

    if (!userPosted || !categoryId || !title || !contents) {
        return res.status(400).send("All fields are required");
    }

    const query = SqlString.format('INSERT INTO forumPosts (userPosted, categoryId, title, contents, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?)')

    db.query(query, [userPosted, categoryId, title, contents, likes || 0, dislikes || 0], (err, result) => {
        if (err) {
            console.error("Error creating post:", err);
            res.status(500).send("Error creating post");
        } else {
            res.status(201).send("Post created successfully");
        }
    });
});

export default router