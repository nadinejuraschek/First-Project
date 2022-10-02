const User = require('../models/user');

const renderCatchAllRoute = (req, res) => {
  res.render('error');
};

const renderDiscover = (req, res) => {
  res.render('discover', { title: 'Discover', currentUser: req.user.username });
};

const renderHome = (req, res) => {
  res.render('home', { title: 'Home', currentUser: req.user.username });
};

const renderLogin = (req, res) => {
  res.render('log-in', {title: 'LogIn'});
};

const renderNewEntry = (req, res) => {
  res.render('newentry', { title: 'Entry', currentUser: req.user.username });
};

const renderOverview = (req, res) => {
  User.findById(req.user.id).populate('entries').then(data => {
    const entries = data.entries;
    const graphData = [];
    for (let i = 0; i < entries.length; i++) {
      entries.map(entry => {
        const graphId = entry.dayId;
        const graphColor = entry.color;
        const graphField = { fieldId: graphId, color: graphColor };
        graphData.push(graphField);
      });
    };
    res.render('overview', { title: 'Overview', currentUser: req.user.username, entries: entries, graphData: graphData });
  });
};

const renderSignup = (req, res) => {
  res.render('signup', {title: 'SignUp'});
};

const htmlController = {
  renderCatchAllRoute,
  renderDiscover,
  renderHome,
  renderLogin,
  renderNewEntry,
  renderOverview,
  renderSignup,
};

module.exports = htmlController;
