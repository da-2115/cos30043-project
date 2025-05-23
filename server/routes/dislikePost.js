import { Router } from "express";
import db from "../db/db.js";
const router = Router()

router.post('/', (req, res) => {
    db.query(`UPDATE forumPosts SET dislikes=${req.body.dislikes} WHERE forumPostId=${req.body.forumPostId}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }

        res.json(results)
    })
})

export default router