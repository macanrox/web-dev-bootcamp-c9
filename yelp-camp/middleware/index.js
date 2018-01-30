var Campground = require("../models/campground");
var Comment = require("../models/comment");

// All middleware goes here
var middlewareObj = {};

//checks if user owns campground and has permissions
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Sorry, that campground does not exist!");
                res.redirect("/campgrounds");
            } else if(foundCampground.author.id.equals(req.user._id)){
                req.campground = foundCampground;
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        //redirect user to previous page
        res.redirect("back");
    }
}

//checks if user's comment and permissions
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Sorry, that comment does not exist!");
                res.redirect("back");
            } else if(foundComment.author.id.equals(req.user._id)){
                req.comment = foundComment;
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
        });
    } else {
        res.flash("error", "You need to be logged in to do that");
        res.redirect("back");   //redirects user to previous page
    }
}

//check if there's a user session
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;