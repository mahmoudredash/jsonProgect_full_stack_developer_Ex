const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
// init db
mongoose.connect((require('./config/keys').MongoURI + 'newsblog').toString(), {
    useNewUrlParser: true
});

const app = express();



// Passport config
require('./config/passport')(passport);

// get connect strem
const db = mongoose.connection;


// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

// body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// Connect flash
app.use(flash());


// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.errors = req.flash("errors");
    res.locals.adm = false;
    res.locals.datas = [];


    next();
});









// Express Validator  Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));






// Routes
app.use('/', require('./routers/index'));
app.use('/user', require('./routers/user'));
app.use('/admin', require('./routers/adminp'));
app.use('/admin', require('./routers/postes'));
app.use('/admin', require('./routers/depart'));
app.use('/admin', require('./routers/commit'));



// init page 404

app.use(function (req, res, next) {
    res.status(404);

    res.format({
        html: function () {
            res.render('404', {
                url: req.url
            })
        },
        json: function () {
            res.json({
                error: 'Not found'
            })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    })
});





const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));