var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat-app", {useMongoClient: true});

//create a pattern
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

//save pattern into a model
//name beginning with uppercase is conventional
//is smart enough to pluralize model name
//currently a singular model name
var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

//saves to the DB
//1st param checks if there's an error while saving
//2nd param is the object that's returned/sent to the DB
// george.save(function(err, cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG!");
//     } else {
//         console.log("CAT SAVED TO THE DB: ");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

//retrieve all cats from the DB and console.log() each one
Cat.find({}, function(err, cats){
    if(err){
        console.log("ERROR");
        console.log(err);
    } else {
        console.log("ALL THE CATS...");
        console.log(cats);
    }
})