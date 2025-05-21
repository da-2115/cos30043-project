import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pass12345',
  database: 'iddDB'
})

app.use(express.json())

app.get('/posts', (req, res) => {
    db.query('SELECT * FROM forumPosts', (err, results) => {
        if ( err ) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }

        res.json(results)
    })
})

app.get('/comments', (req, res) => {
    db.query('SELECT * FROM forumComments', (err, results) => {
        if ( err ) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }

        res.json(results)
    })
})

app.post('/likePost', (req, res) => {
    db.query(`UPDATE forumPosts SET likes=${req.body.likes} WHERE forumPostId=${req.body.forumPostId}`, (err, results) => {
        if ( err ) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }

        res.json(results)
    })
})

app.post('/dislikePost', (req, res) => {
    db.query(`UPDATE forumPosts SET dislikes=${req.body.dislikes} WHERE forumPostId=${req.body.forumPostId}`, (err, results) => {
        if ( err ) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }

        res.json(results)
    })
})

app.post('/createPost', (req, res) => {
    db.query(`INSERT INTO forumPosts VALUES (${req.body.id}, '${req.body.title}', '${req.body.contents}', ${req.body.likes}, ${req.body.dislikes})`, (err, results) => {
        if ( err ) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }

        res.json(results)
    })
})

app.post('/createComment', (req, res) => {
    db.query(`INSERT INTO forumComments VALUES (${req.body.forumPostId}, '${req.body.commentText}')`, (err, results) => {
        if ( err ) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }

        res.json(results)
    })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})