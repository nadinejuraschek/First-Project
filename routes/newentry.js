const   express     = require('express');
        router      = express.Router(),
        mongoose    = require('mongoose'),
        User        = require('../models/user'),
        Log         = require('../models/log'),
        Question    = require('../models/modal'),
        Quotes      = require('../models/quotes');


// INDEX - show all entries
router.get('/overview', isLoggedIn, function(req, res) {
    // get all entries from DB
    const perPage = 7;
    const pageQuery = parseInt(req.query.page);
    const pageNum = pageQuery ? pageQuery : 1;
    Log.find({}).skip((perPage * pageNum) - perPage).limit(perPage).exec(function(err, allLogs){
      Log.count().exec(function(err, count) {
        if(err){
          console.log("Error: " + err);
        } else {
          res.render('overview', { title: 'Overview', logs: allLogs, current: pageNum, pages: Math.ceil(count / perPage) });
        };
      });
    });
});

// CREATE - add entry to DB
// router.post('/overview', isLoggedIn, function(req, res) {
//     // create new entry and save to DB
//     Log.create(req.body.log, function(err, log) {
//       if(err) {
//         console.log('Error: ' + err);
//         return res.redirect('back');
//       } else {
//         // redirect to overview
//         console.log('New Entry: ' + log);
//         res.redirect('/overview');
//       };
//     });
// });

// NEW - show form to add entry
// router.get('/newentry', isLoggedIn, function(req, res){
//     res.render('newentry', {title: 'Entry', currentUser: req.user.username});
// });

// SHOW - displays more info about a specific entry
// router.get('/entries/:id', isLoggedIn, function(req, res) {
//     // find entry with provided ID
//     Log.findById(req.params.id).populate('comments').exec(function(err, foundLog){
//       if (err) console.log(err);
//       res.render('entries/show', { title: 'Entry', log: foundLog });
//     });
// });

// EDIT
// router.get('/entries/:id/edit', isLoggedIn, function(req, res){
//   Log.findById(req.params.id, function(err, foundLog){
//     if (err) {
//       res.redirect('back');
//     } else {
//       res.render('entries/edit', { title: 'Entry', logs: foundLog });
//     };
//   });
// });

// UPDATE
router.put('entries/:id', isLoggedIn, function(req, res){
  // find and update entry
  Log.findByIdAndUpdate(req.params.id, req.body.log, function(err, updatedLog){
    if(err){
      res.redirect('/overview');
    } else {
      res.redirect('/entries/' + req.params.id);
    }
  })
});

// DESTROY
router.delete('/entries/:id', isLoggedIn, function(req, res){
  Log.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect('/overview');
    } else {
      res.redirect('/overview');
    }
  })
});

// check if user is logged in logic
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;