import { Router } from "express";
import db from "../db/db.js";

const router = Router()

router.get('/', (req, res) => {
    db.query('SELECT * FROM forumComments', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }

        res.json(results)
    })
})

export default router