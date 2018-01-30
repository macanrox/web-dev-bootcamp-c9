var express = require("express");   //declare express
var app = express();    //initialize

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});

app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

app.get("/dog", function(req, res) {
    res.send("Meow!");
});

app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    res.send("Welcome to the "+subreddit.toUpperCase()+" page!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    res.send("Welcome to the comments page!");
});

app.get("*", function(req, res) {
   res.send("Error, page not found!"); 
});

//tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});