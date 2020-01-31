const   express     = require('express');
        router      = express.Router(),
        User        = require('../models/user'),
        Log         = require('../models/log');

router.post('/home', isLoggedIn, function(req, res){
    console.log(req.body);
    // create entry in db
    // let newLog = {
    //     date: DATE,
    //     mood: mood,
    //     questionA: ansQ1,
    //     questionB: ansQ2,
    //     questionC: ansQ3,
    //     comment: comment
    // };
    // console.log(newLog);
    // Log.create(newLog, function(err, addLog) {
    //     if(err) {
    //         console.log('Error: ' + err);
    //     } else {
    //         // redirect to overview
    //         res.redirect('/overview');
    //     };
    // });
});

// check if user is logged in logic
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;