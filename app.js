var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var engine = require('ejs-locals');
var createError = require('http-errors'); // เรียกใช้งาน http-errors module
var port = 3000; // port 
var passport = require('passport'); // เรียกใช้งาน passport
var sess = require('express-session'); // เรียกใช้งาน express-session
var BetterMemoryStore = require('session-memory-store')(sess);

var app = express();

// ส่วนของการใช้งาน router module ต่างๆ
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var dashboardRouter = require('./routes/dashboard');
var showRouter = require('./routes/show');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('view options', { delimiter: '?' });

// use module setup
app.use(expressLayouts);
app.use(favicon());
app.use(logger('dev'));

// use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// set path public
app.use(express.static(__dirname + '/public'));

// use passport
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// use connect-flash
// app.configure(function () {
//     app.use(express.cookieParser('keyboard cat'));
//     app.use(express.session({ cookie: { maxAge: 60000 } }));
//     app.use(flash());
// });

// use session store
var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
app.use(sess({
   name: 'JSESSION',
   secret: 'MYSECRETISVERYSECRET',
   store:  store,
   resave: true,
   saveUninitialized: true
}));

// เรียกใช้งาน router module ต่างๆ
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dashboard', dashboardRouter);
app.use('/show', showRouter);

// middlewear
app.use(function (req, res, next) {
    var err = createError(404)
    next(err)
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));