const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userC');
const ensureAuthenticated = require('../config/auth');


// hundel dashbord and all data cms


router.get('/dashboard', ensureAuthenticated, function (req, res) {
    const data = {
        username: req.user.username,
        adm: function () {
            if (!req.adm) {
                return true;
            }
        }

    };
    res.render('dashbord', data);
});


// Show All Users
router.get('/users', ensureAuthenticated, (req, res) => {
    const us = UserController.getAllusers({}, res);
});

// Get  Update Users
router.get('/userupdate/:id', ensureAuthenticated, async (req, res, next) => {
    try {
        // using Controll 
        UserController.updateuser(req.params.id, res);

    } catch (error) {
        next(error);
    }
});

// Post Update Users
router.post('/userupdate', ensureAuthenticated, (req, res) => {

    req.checkBody('username', 'UserName is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();
    req.checkBody('password', 'Password is Required').notEmpty();
    const error = req.validationErrors();
    if (error) {
        req.flash('error_msg', error.msg);
        res.redirect('/admin/dashboard');
    } else {

        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            date: req.body.date
        };
        UserController.updateuserPost(req.body.id, req.body.changpass, data, (err, doc) => {
            if (err) {
                req.flash('error_msg', err.msg);
                res.redirect('/admin/users');
            }


            req.flash('success_msg', "'Your Updatred post in DB !:)")
            res.redirect('/admin/users');
        });
    }
});



// Delete Users
router.get('/userdelete/:id', ensureAuthenticated, (req, res) => {
    UserController.deltedUser(req.params.id, res);

});



module.exports = router;