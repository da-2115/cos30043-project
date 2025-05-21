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
  database: 'iddDB',
  multipleStatements: true
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

app.post("/createPost", (req, res) => {
    const { userPosted, categoryId, title, contents, likes, dislikes } = req.body;

    if (!userPosted || !categoryId || !title || !contents) {
        return res.status(400).send("All fields are required");
    }

    const query = `
        INSERT INTO forumPosts (userPosted, categoryId, title, contents, likes, dislikes)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [userPosted, categoryId, title, contents, likes || 0, dislikes || 0], (err, result) => {
        if (err) {
            console.error("Error creating post:", err);
            res.status(500).send("Error creating post");
        } else {
            res.status(201).send("Post created successfully");
        }
    });
});
  app.post("/createComment", (req, res) => {
    const { forumPostId, userPosted, commentText } = req.body;
  
    if (!forumPostId) {
      return res.status(400).send("forumPostId is required");
    }
  
    const query = `
      INSERT INTO forumComments (forumPostId, userPosted, commentText)
      VALUES (?, ?, ?)
    `;
  
    db.query(query, [forumPostId, userPosted, commentText], (err, result) => {
      if (err) {
        console.error("Error creating comment:", err);
        res.status(500).send("Error creating comment");
      } else {
        res.status(201).send("Comment created successfully");
      }
    });
  });

app.post('/deletePost', (req, res) => {
    db.query(`DELETE FROM forumComments WHERE forumPostId=${req.body.forumPostId}; DELETE FROM forumPosts WHERE forumPostId=${req.body.forumPostId}`, (err, results) => {
        if ( err ) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }

        res.json(results)
    })
})

app.get("/getPosts/:id", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})