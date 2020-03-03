const   express     = require('express');
        router      = express.Router(),
        mongoose    = require('mongoose'),
        User        = require('../models/user'),
        Log         = require('../models/log'),
        Question    = require('../models/modal'),
        Quotes      = require('../models/quotes');

router.post("/api/entries", function (req, res) {
    // Log.create(data).then(function (moodsphere) {
    //     res.json(moodsphere);
    // });
    res.send('Posted!');
});

// check if user is logged in logic
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;