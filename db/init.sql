CREATE DATABASE iddDB;
USE iddDB;

CREATE TABLE forumPosts (
    forumPostId INT, 
    title varchar(255), 
    contents varchar(255), 
    likes INT, 
    dislikes INT, 
    PRIMARY KEY(forumPostId)
);

CREATE TABLE forumComments (
    forumPostId INT, 
    commentText varchar(255),
    CONSTRAINT FK_PostComment FOREIGN KEY (forumPostId) REFERENCES forumPosts(forumPostId)
);