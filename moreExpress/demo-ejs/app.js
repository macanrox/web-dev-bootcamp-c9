var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs");
    //res.send("Welcome to the home page!"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is listening"); 
});