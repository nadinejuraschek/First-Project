const   express         = require('express'),
        entryController  = require('../controllers/entry'),
        htmlController  = require('../controllers/html'),
        userController  = require('../controllers/user'),
        router          = express.Router();

// redirect user to /login or /home when visiting /
router.get('/', userController.isLoggedIn, (req, res) => {
    res.redirect('/home');
});

// render /home, /overview, and /discover if user is signed in, otherwise redirect to /login
router.get('/home', userController.isLoggedIn, htmlController.renderHome);

router.get('/overview', userController.isLoggedIn, htmlController.renderOverview);
router.post('/overview', userController.isLoggedIn, entryController.createEntry);

// ENTRY API ROUTES
router.get("/api/user/:id/entries", userController.isLoggedIn, entryController.getAllEntries)

router.get('/discover', userController.isLoggedIn, htmlController.renderDiscover);

router.get('/newentry', userController.isLoggedIn, htmlController.renderNewEntry);

// catch all route
router.get('*', htmlController.renderCatchAllRoute);

module.exports = router;
