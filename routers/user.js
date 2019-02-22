const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userC');
const ensureAuthenticated = require('../config/auth');







// get Login Page
router.get('/login', (req, res) => res.render('login'))


//#################### Post Login Page  ###########################
router.post('/login', (req, res, next) => {

    UserController.loginUser(req, res, next);

    // ###### Hundel Erorr in login   
    require('../config/errores').messageE.forEach(err => {
        req.flash("error_msg", err);
    });

    // ###### Hundel successfully in login
    require('../config/errores').messageS.forEach(euc => {
        req.flash('success_msg', req.message);
    });
    require('../config/errores').messageE = [];
    require('../config/errores').messageS = [];
});




//#################




// Get add Users
router.get('/adduser', ensureAuthenticated, function (req, res) {
    res.render('addUser', {
        adm: function () {
            if (!req.adm) {
                return true;
            }
        }
    });
})

//#################### Post add User#################### 
router.post('/adduser', ensureAuthenticated, function (req, res) {
    req.checkBody('username', 'UserName is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();
    req.checkBody('password', 'Password is Required').notEmpty();
    req.checkBody('password2', 'not Confirm Password').equals(req.body.password);
    // result all errors from inputs
    const errors = req.validationErrors();
    if (errors) {
        res.render('adduser', {
            errors: errors
        });
    } else {
        UserController.createNewUser(req.body, (err, user) => {
            if (err) throw err;
            req.flash('success_msg', 'Your Add New User in DB !:)');
            res.redirect('/admin/dashboard');
        });
    }
});


//################## logout #####################
router.get('/logout', ensureAuthenticated, (req, res, next) => {

    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/user/login');
});





module.exports = router;