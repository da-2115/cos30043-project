<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card p-3">
                    <h3>{{ post.title }}</h3>
                    <p v-html="formatContent(post.contents)"></p> <!-- Render formatted content -->
                    <p><strong>Posted by:</strong> {{ post.userPosted }}</p>

                    <button class="btn btn-secondary" @click="$router.push({ name: 'AdvancedSearch' })">
                        Back to Posts
                    </button>
                    <p></p>
                    <button @click="deletePost(post)" v-if="post.userPosted === this.user.name" class="btn btn-warning">
                        Delete
                    </button>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card p-3">
                    <h5>Comments Section</h5>
                    <div id="comment" v-for="comment in getCommentsForPost" :key="comment.commentId">
                        <strong>{{ comment.userPosted }}</strong>: {{ comment.commentText }}
                    </div>
                    <p>Leave a comment</p>
                    <textarea class="form-control" v-model="commentInputs[postId]"></textarea>
                    <button class="btn btn-primary" @click="createComment(postId)">Post</button>
                    <button @click="likeCurrentPost(post)" class="btn btn-success m-1">{{ getLikes(postId) }}
                        <font-awesome-icon :icon="['fas', 'thumbs-up']" /></button>
                    <button @click="dislikeCurrentPost(post)" class="btn btn-danger m-1">{{ getDislikes(postId) }}
                        <font-awesome-icon :icon="['fas', 'thumbs-down']" /></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { mapMutations } from "vuex/dist/vuex.cjs.js";

export default {
    name: "PostDetails",
    props: {
        postId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            post: {}, // Holds the post details
            commentInputs: {}, // Holds the comment input for each post
        };
    },
    computed: {
        ...mapState("forum", ["posts", "comments"]),
        ...mapGetters("forum", ["getLikes", "getDislikes"]),
        ...mapState("auth", ["user"]),
        getCommentsForPost() {
            if (!this.comments) {
                console.error("Comments array is undefined");
                return [];
            }
            console.log("Filtering comments for postId:", this.postId, this.comments);
            return this.comments.filter((c) => c.forumPostId === this.postId);
        },
    },
    methods: {
        ...mapActions("forum", ["fetchPosts", "fetchComments"]),
        ...mapMutations("forum", ["updateLikes", "updateDislikes"]),
        fetchPost(postId) {
            // Fetch the post details from Vuex or backend
            this.post = this.posts.find((p) => p.forumPostId === postId) || {};
        },
        formatContent(content) {
            if (!content) {
                console.warn("Content is undefined or empty");
                return ""; // Return an empty string if content is undefined
            }

            // Check if the content contains $$$
            const codeRegex = /\$\$\$(.*?)\$\$\$/gs; // Matches text between $$$
            return content.replace(codeRegex, (match, code) => {
                // Wrap the extracted code in <pre><code> tags
                return `<pre><code>${code.trim()}</code></pre>`;
            });
        },
        createComment(postId) {
            const commentText = this.commentInputs[postId] || "";
            if (!commentText.trim()) {
                console.error("Comment text is empty");
                return;
            }

            fetch("http://localhost:3000/createComment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    forumPostId: postId,
                    userPosted: this.user.name,
                    commentText: commentText,
                }),
            })
                .then(() => {
                    this.fetchComments(postId); // Refresh comments after posting
                    this.commentInputs[postId] = ""; // Clear the input field
                })
                .catch((error) => {
                    console.error("Error creating comment:", error);
                });
        },
        deletePost(post) {
            fetch("http://localhost:3000/deletePost", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ forumPostId: post.forumPostId }),
            }).then(() => {
                this.$router.push({ name: "AdvancedSearch" });
            });
        },
        likeCurrentPost(post) {
            fetch("http://localhost:3000/likePost", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ forumPostId: post.forumPostId, likes: post.likes + 1 }),
            }).then(() => {
                this.updateLikes({ forumPostId: post.forumPostId, likes: post.likes + 1 });
            });
        },
        dislikeCurrentPost(post) {
            fetch("http://localhost:3000/dislikePost", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ forumPostId: post.forumPostId, dislikes: post.dislikes + 1 }),
            }).then(() => {
                this.updateDislikes({ forumPostId: post.forumPostId, dislikes: post.dislikes + 1 });
            });
        },
    },
    mounted() {
        this.fetchPost(this.postId); // Fetch the post details
        this.fetchComments(this.postId); // Fetch comments for the specific post
    },
};
</script>

<style scoped>
/* Add styles here if needed */
</style>