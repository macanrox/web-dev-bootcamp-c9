var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment!"); 
});

app.get("/speak/:animalName", function(req, res){
    //console.log(req.params);
    var animal = req.params.animalName;
    switch(animal){
        case 'pig':
            res.send("The pig says 'OINK'");
            break;
        case 'cow':
            res.send("The cow says 'MOO'");
            break;
        case 'dog':
            res.send("The dog says 'WOOF'");
            break;
        default:
            res.send("Sorry, page not found...What are you doing with your life?"); 
            break;
    }//end switch
});

app.get("/repeat/:greet/:num", function(req, res) {
    var greet = req.params.greet;
    var num = req.params.num;
    var result = "";
    
    for(var i = 0; i < num; i++){
        result += (greet+" ");
    }
    
    res.send(result);
    
});

//error catch
app.get("*", function(req, res) {
   res.send("Sorry, page not found...What are you doing with your life?"); 
});

//tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});