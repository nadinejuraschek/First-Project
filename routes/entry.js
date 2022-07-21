const   express     = require('express');
        entryController  = require('../controllers/entry'),
        userController  = require('../controllers/user'),
        router      = express.Router();

// UPDATE
router.put('entries/:id', userController.isLoggedIn, entryController.updateEntry);

// DESTROY
router.delete('/entries/:id', userController.isLoggedIn, entryController.deleteEntry);

module.exports = router;