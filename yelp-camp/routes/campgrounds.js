var express = require("express");
var router = express.Router();
var methodOverride = require("method-override");
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.use(methodOverride("_method"));

//INDEX - show all campgrounds
router.get("/", function(req, res){
    //get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});   
        }
    });
});

//CREATE - displays form to make a new campground
router.post("/", middleware.isLoggedIn, function(req, res){
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, price: price, image: image, description: desc, author: author};
   //create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           //send user back to the form and show message
           console.log(err);
       } else {
           //redirect to campgrounds page as a GET request
           res.redirect("/campgrounds");
       }
   });
});

//NEW - adds a new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err || !foundCampground){
           console.log(err);
           req.flash("error", "Sorry, that campground does not exist!");
       }
        //render show template with the campground
        res.render("campgrounds/show", {campground: foundCampground});
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   //find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
          res.redirect("/campgrounds");
      } else {
          //redirect somewhere (show page)
          res.redirect("/campgrounds/"+req.params.id);
      }
   });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;