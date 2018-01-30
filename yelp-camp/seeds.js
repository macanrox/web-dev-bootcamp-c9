var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "http://photosforclass.com/download/7121861565",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Desert Mesa", 
        image: "http://photosforclass.com/download/1342367857",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Canyon Floor", 
        image: "http://photosforclass.com/download/1430198323",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

//Wipes database
function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log("REMOVED CAMPGROUNDS");
        
        //add a few campgrounds
        data.forEach(function(seed){
           Campground.create(seed, function(err, campground){
               if(err){
                   console.log(err);
               } else {
                   console.log("ADDED CAMPGROUND");
                   //create a comment
                   Comment.create(
                       {
                           text: "This place is great, but I was there was internet!",
                           author: "Homer"
                       }, function(err, comment){
                           if(err){
                               console.log(err);
                           } else {
                                campground.comments.push(comment._id);
                                campground.save();
                                console.log("CREATED NEW COMMENT");
                           }
                       }
                    )
               }
           });
        });
    });
    
    //add a few comments
}

module.exports = seedDB;