// NPM PACKAGES
require('dotenv').config();
const   express         = require('express'),
        path            = require('path'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        ejs             = require('ejs'),
        favicon         = require('serve-favicon'),
        app             = express(),
        User            = require('./models/user'),
        Log             = require('./models/log');

// ROUTES
const miscRoutes        = require('./routes/misc'),
      newentryRoutes    = require('./routes/newentry'),
      userRoutes        = require('./routes/user');

// MONGODB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// EXPRESS SETUP
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public/assets/images', 'favicon.ico')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS SETUP
app.set('view engine', 'ejs');

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ============================
// SERVER
// ============================
app.use(userRoutes);
app.use(miscRoutes);
app.use(newentryRoutes);

// server logic
app.listen(process.env.PORT, function(){
    console.log('Server is listening on PORT ' + process.env.PORT + '.');
});