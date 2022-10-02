const   express         = require('express'),
        htmlController  = require('../controllers/html'),
        userController  = require('../controllers/user'),
        passport        = require('passport'),
        router          = express.Router();

// handle sign up logic
router.get('/signup', htmlController.renderSignup)
router.post('/signup', userController.signup);

// login logic
router.get('/login', htmlController.renderLogin)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login'
}));

// logout logic
router.get('/logout', userController.logout);

module.exports = router;