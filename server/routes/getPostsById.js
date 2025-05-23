import { Router } from "express";
import db from "../db/db.js";

const router = Router()

router.get("/", (req, res) => {
    const postId = req.params.id;

    const query = "SELECT * FROM forumPosts WHERE forumPostId = ?";
    db.query(query, [postId], (err, results) => {
        if (err) {
            console.error("Error fetching post:", err);
            res.status(500).send("Error fetching post");
        } else if (results.length === 0) {
            res.status(404).send("Post not found");
        } else {
            res.json(results[0]); // Return the first (and only) result
        }
    });
});

export default router