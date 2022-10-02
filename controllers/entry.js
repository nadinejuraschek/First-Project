const chalk     = require('chalk'),
      User      = require('../models/user'),
      Log       = require('../models/log');

const createEntry = (req, res) => {
  Log.create(req.body).then(insertedLog => {
    User.findByIdAndUpdate({ _id: req.user._id }, { $push: { entries: insertedLog._id } }, (error, success) => {
      if (error) {
        console.log(chalk.red('Failed to create new entry. Error: ', error));
      } else {
        console.log(chalk.green('New entry created successfully!'));
      };
    });
  });
};

const deleteEntry = (req, res) => {
  Log.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(chalk.red('Failed to delete chosen entry. Error: ', err));
      res.redirect('/overview');
    } else {
      console.log(chalk.green('Entry has been deleted.'));
      res.redirect('/overview');
    }
  });
};

const getAllEntries = (req, res) => {
  User.findById(req.user.id).populate('entries').then(data => {
    res.json(data.entries);
  }).catch(err => console.log(chalk.red('Failed to fetch entries. Error: ', err)));
}

const updateEntry = (req, res) => {
  // find and update entry
  Log.findByIdAndUpdate(req.params.id, req.body.log, (err, updatedLog) => {
    if (err) {
      console.log(chalk.red('Failed to update chosen entry. Error: ', err));
      res.redirect('/overview');
    } else {
      console.log(chalk.green('Entry has been updated successfully!'));
      res.redirect('/entries/' + req.params.id);
    }
  });
};

const entryController = {
  createEntry,
  deleteEntry,
  getAllEntries,
  updateEntry,
};

module.exports = entryController;
