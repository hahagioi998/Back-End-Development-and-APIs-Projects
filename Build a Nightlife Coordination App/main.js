var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');

var helmet = require('helmet');
var mongoose = require('mongoose');
var url = require('./config/db.js').url;
mongoose.connect(url);
var passport = require('passport');
var flash = require('connect-flash');
var Yelp = require('yelp');
var app = express();

//APP CONFIG
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(helmet());
app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
})

//DB
var db = mongoose.connection;
db.on('error', function (err) {
    console.log("Unable to connect to DB: " + db);
});
db.on('open', function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Connected to DB");
})

// PASSPORT JS
//Passport Config
require('./config/passport.js')(passport);

// YELP
//var yelp = require('./config/yelp.js');
const yelp = require('yelp-fusion');
const clientId = "kztN6koqJB61878NnCIMCw";
const clientSecret = "zyodSpB2NBHA9ReDQOMljO61xoVzqYeadiOQ79p23XSZtXRC6wKkjaeLf4dO46if";
const token = "OoG9c5GGi6Doel9UeAk8X4F8kPpj-o8srUJ6blwr_nrx4k04BkHeLXALuvepBWdb3pnF1xuqcFB_m8n6o4VyRuoIubmHWFdvCnSfvWKY13-MYMyVNM_kFlT37TLYWXYx";
const client = yelp.client(token);
//APP START
var auth = require('./routes/auth.js');
app.use('/auth', auth);

app.get('/', function (req, res) {
    var responseArr = [];
    res.render('mainpage', { title: "Main Page", responseArr: responseArr });
});

app.get('/search/api', function (req, res) {
    var searchInput = req.query.search;
    client.search({
        term: "bar",
        location: searchInput
    })
        .then(function (response) {
            var responseArr = response.jsonBody.businesses;
            console.log(responseArr[0]);
            res.render('searchResult', {
                title: 'Search Result',
                responseArr: responseArr
            });
        })
        .catch(function (e) {
            console.log(e)
        })

});

app.listen(process.env.PORT || 3000, function () {
    console.log('listening on port 3000');
}) 