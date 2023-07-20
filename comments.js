// Create web server application using Express
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Setting up the body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Setting up the HTML template engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Setting up the data directory
const dataPath = path.join(__dirname, 'data');
const commentsPath = path.join(dataPath, 'comments.json');

// Function to read the comments.json file
function readCommentsFile() {
  return JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
}

// Function to write the comments.json file
function writeCommentsFile(comments) {
  fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
}

// Function to get the next ID
function getNextId(comments) {
  return comments.reduce((acc, comment) => {
    return comment.id > acc ? comment.id : acc;
  }, 0) + 1;
}

// Function to get the next ID
function getNextId(comments) {
  return comments.reduce((acc, comment) => {
    return comment.id > acc ? comment.id : acc;
  }, 0) + 1;
}

// Function to validate the comment
function validateComment(comment) {
  if (comment.name && comment.comment) {
    return true;
  }
  return false;
}

// GET /comments
app.get('/comments', (req, res) => {
  const comments = readCommentsFile();
  res.render('comments', { comments: comments });
});

// POST /comments
app.post('/comments', (req, res) => {
  const comments = readCommentsFile();
  const comment = req.body;
  comment.id = getNextId(comments);
  if (validateComment(comment)) {
    comments.push(comment);
    writeCommentsFile(comments);
    res.redirect('/comments');
  } else {
    res.redirect('/comments/new');
  }
});

// GET /comments/new
app.get('/comments/new', (req, res) => {
  res.render('new-comment');
});

// GET /comments/:id
