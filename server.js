// NPM PACKAGES
require('dotenv').config();
const   express         = require('express'),
        mongoose        = require('mongoose'),
        ejs             = require('ejs'),
        app             = express();

// MONGODB
mongoose.connect(process.env.MONGO_DB);

// EXPRESS SETUP
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS SETUP
app.set('view engine', 'ejs');

// SCHEMA SETUP

// ============================
// SERVER
// ============================
// server logic
app.listen(process.env.PORT, function(){
    console.log('Server is listening on PORT ' + process.env.PORT + '.');
});