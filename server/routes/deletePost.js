import { Router } from "express";
import db from "../db/db.js";

const router = Router()

router.post('/', (req, res) => {
    db.query(`DELETE FROM forumComments WHERE forumPostId=${req.body.forumPostId}; DELETE FROM forumPosts WHERE forumPostId=${req.body.forumPostId}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }

        res.json(results)
    })
})

export default router