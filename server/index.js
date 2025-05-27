/*
  server/index.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import express from "express"
import cors from "cors"
import posts from "./routes/posts.js"
import comments from "./routes/comments.js"
import createPost from "./routes/createPost.js"
import createComment from "./routes/createComment.js"
import getPostById from "./routes/getPostsById.js"
import deletePost from "./routes/deletePost.js"
import editPost from "./routes/editPost.js"
import likePost from "./routes/likePost.js"
import dislikePost from "./routes/dislikePost.js"
import socials from "./routes/socials.js"

// Initialize an express instance, set port number of API to port 3000
const app = express()
const PORT = 3000

// Use CORS and JSON
app.use(cors())
app.use(express.json())

// Use all routes as defined under routes folder
app.use("/posts", posts)
app.use("/comments", comments)
app.use("/createPost", createPost)
app.use("/createComment", createComment)
app.use("/deletePost", deletePost)
app.use("/getPost/id", getPostById)
app.use("/editPost", editPost)
app.use("/likePost", likePost)
app.use("/dislikePost", dislikePost)
app.use("/socials", socials)

// Listen on port 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
