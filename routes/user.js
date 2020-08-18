const   express   = require('express');
        router    = express.Router()
        passport  = require('passport'),
        User      = require('../models/user');

// handle sign up logic
router.get('/signup', function(req, res){
    res.render('signup', {title: 'SignUp'});
});
router.post('/signup', function(req, res){
    const newUser = new User({
        email: req.body.email,
        username: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log("Something went wrong: " + err);
            return res.render('signup', {title: 'SignUp'});
        }
        passport.authenticate('local')(req, res, function(){
            console.log('User is logged in.');
            res.redirect('/home');
        })
    });
});

// login logic
router.get('/login', function(req, res){
    res.render('log-in', {title: 'LogIn'});
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

// logout logic
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

// check if user is logged in logic
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;