const passport  = require('passport'),
      chalk     = require('chalk'),
      User      = require('../models/user');

const signup = (req, res) => {
  const newUser = new User({
    email: req.body.email.toLowerCase(),
    username: req.body.username,
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(chalk.red("Failed to sign up user. Error: " + err));
      return res.render('signup', {title: 'SignUp'});
    }
    passport.authenticate('local')(req, res, () => {
      console.log(chalk.green('User is logged in.'));
      res.redirect('/home');
    });
  });
};

const logout = (req, res) => {
  req.logout(err => {
    if (err) {
      console.log(chalk.red('Failed to lof out user. Error: ', err));
      return next(err);
    }
    console.log(chalk.green('User has been logged out successfully!'));
    res.redirect('/login');
  });
};

// check if user is logged in logic
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

const userController = {
  isLoggedIn,
  logout,
  signup,
};

module.exports = userController;
