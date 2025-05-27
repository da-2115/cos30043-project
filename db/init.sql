/*
  db/init.sql
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1

 PURPOSE: To create the initial database, tables and forum category data for the MySQL Database
*/

CREATE DATABASE iddDB;
USE iddDB;

CREATE TABLE forumCategories (
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(255) NOT NULL
);

CREATE TABLE forumPosts (
    forumPostId INT AUTO_INCREMENT PRIMARY KEY,
    userPosted VARCHAR(255) NOT NULL,
    categoryId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    FOREIGN KEY (categoryId) REFERENCES forumCategories(categoryId)
);

CREATE TABLE forumSocials (
    forumSocialId INT AUTO_INCREMENT PRIMARY KEY,
    forumPostId INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    hasLiked BOOL DEFAULT FALSE,
    hasDisliked BOOL DEFAULT FALSE,
    UNIQUE KEY unique_vote (forumPostId, username),
    FOREIGN KEY (forumPostId) REFERENCES forumPosts(forumPostId)
);

CREATE TABLE forumComments (
    commentId INT AUTO_INCREMENT PRIMARY KEY,
    forumPostId INT NOT NULL,
    userPosted VARCHAR(255) NOT NULL,
    commentText TEXT NOT NULL,
    FOREIGN KEY (forumPostId) REFERENCES forumPosts(forumPostId)
);

INSERT INTO forumCategories (categoryName) VALUES
('C'),
('C++'),
('Rust'),
('C#'),
('Java'),
('JavaScript'),
('Kotlin'),
('Swift'),
('TypeScript'),
('SQL'),
('PHP'),
('HTML'),
('CSS'),
('Scala'),
('Python'),
('Ruby'),
('R'),
('Go'),
('AWS'),
('Azure'),
('Cisco'),
('GCP'),
('Docker'),
('Kubernetes'),
('Terraform');