// NPM PACKAGES
require('dotenv').config();
const   express         = require('express'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        ejs             = require('ejs'),
        app             = express(),
        User            = require('./models/user');

// MONGODB
mongoose.connect(process.env.MONGO_DB);

// EXPRESS SETUP
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS SETUP
app.set('view engine', 'ejs');

// SCHEMA SETUP

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ============================
// SERVER
// ============================
// redirect user to /login or /home when visiting /
app.get('/', isLoggedIn, function(req, res){
    res.redirect('/home');
});

// handle sign up logic
app.get('/signup', function(req, res){
    res.render('signup', {title: 'Register'});
});
app.post('/signup', function(req, res){
    const newUser = new User({
        email: req.body.email,
        username: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log("Something went wrong: " + err);
            return res.render('signup');
        }
        passport.authenticate('local')(req, res, function(){
            console.log('User is logged in.');
            res.redirect('/home');
        })
    });
});

// login logic
app.get('/login', function(req, res){
    res.render('log-in', {title: 'Login'});
});
app.post('/login', passport.authenticate('local', 
    { 
        successRedirect: '/home',
        failureRedirect: '/login'
}));

// logout logic
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

// render /home, /overview, and /discover if user is signed in, otherwise redirect to /login
app.get('/home', isLoggedIn, function(req, res){
    res.render('home', {title: 'Home', currentUser: req.user.username});
});
app.get('/overview', isLoggedIn, function(req, res){
    res.render('overview', {title: 'Overview', currentUser: req.user.username});
});
app.get('/discover', isLoggedIn, function(req, res){
    res.render('discover', {title: 'Discover', currentUser: req.user.username});
});

// check if user is logged in logic
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

// catch all route
app.get('*', function(req, res){
    res.render('error');
});

// server logic
app.listen(process.env.PORT, function(){
    console.log('Server is listening on PORT ' + process.env.PORT + '.');
});