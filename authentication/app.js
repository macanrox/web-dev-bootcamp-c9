var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    
mongoose.connect("mongodb://localhost/auth-demo-app");

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "I enjoy belly rubs",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
//reads user session and de/serializes it
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========
// ROUTES
// ========

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// AUTH ROUTES
//show sign up form
app.get("/register", function(req, res){
    res.render("register");
});
//handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render('register');
       }
       //takes serialized user session and specifies a strategy 
       passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
       });
    });
});

// LOGIN ROUTES
//render login form
app.get("/login", function(req, res) {
    res.render("login");
});
//login logic
//middleware (passport)
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
    }), function(req, res){
    
});

app.get("/logout", function(req, res) {
   req.logout();    //destroys all user data in session (not database)
   res.redirect("/");
});

//middleware to check if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();  //perform the next parameter action
    }
    //otherwise user isn't logged in or there's an error
    res.redirect("/login");
}

//SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER STARTED");
});