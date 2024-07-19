# Northcoders News API

Scoop Scroller NC News API

1. PROJECT SUMMARY
   This project provides a RESTful API for accessing and interacting with articles, topics, users and comments. It is designed to be a backend for a news blogging site in the vein of sites such as Reddit and Tumblr, offering various endpoints to get, post, patch and delete content. It is developed with Model-View-Controller software design pattern, as a foundation, to allow reusability and modularity during development.

Features:
-- Get available endpoints
-- Fetch articles, topics, users and comments
-- Access a range of articles with options to select, sort and manage them
-- View user information such as usernames and avatars
-- Manage comments on articles by posting new comments and delete existing
-- Update voting dynamically to reflect user engagement with votes system
-- Complex queries conditionally constructed
-- Defensive programming in the form of greenlisting to protect against SQL injection attacks
-- Error handling middleware with PSQL and custom errors included
-- Seperate testing and development databases for eliminating risk of data mutation within testing suite, faster reseeding and easier to update

Technology and framework used:
-- Node.js
-- Express
-- PostgreSQL

2. HOSTED URL: https://scoop-scroller-nc-news.onrender.com

3. INSTALLATION INSTRUCTIONS

Clone repository:
-- Get started by cloning this GitHub repo (https://github.com/enterthestream/NC-Scoop-Scroll.git)

-- Navigate to project folder

Install dependencies:
-- Open a new terminal and run npm install to install all dependencies, see package.json for individual dependencies

Seed local database
-- In the terminal run npm seed

Run tests
-- Go into the terminal and run npm test

To run this project locally:
-- Create two .env files named .env.test and .env.development in the project root directory
-- Into each .env file, add PGDATABASE=, with the appropriate database for that environment (see /db/setup.sql for the database names)

Technology requirements:
-- Node.js Version >= 27.5.1
-- PostgreSQL Version >= 8.12.0

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
