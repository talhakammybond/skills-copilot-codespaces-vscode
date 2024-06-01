// Create web server and listen on port 3000
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read the file and parse the comments
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Display a message for root path
app.get('/', function(req, res) {
    res.send('Welcome to the comments page');
});

// Display all comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// Add a new comment
app.post('/comments', function(req, res) {
    var newComment = {
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(comments);
});

// Listen on port 3000
app.listen(3000, function() {
    console.log('Server is running on port 3000');
});

