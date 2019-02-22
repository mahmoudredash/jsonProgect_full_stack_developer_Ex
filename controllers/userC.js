const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


const db = null;




module.exports = {
    createNewUser: (body = {}, callback) => {
        const newUser = new User({
            username: body.username,
            email: body.email,
            password: body.password,
        });

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                newUser.password = hash;
                newUser.save(callback);
            });
        });

    },
    loginUser: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/user/login',
            failureFlash: true
        })(req, res, next);
    },
    getAllusers: ({}, res) => {
        const usersA = [];
        User.find({}, (err, users) => {
            if (err) console.log("Error Data DB");
            if (users) {
                users.forEach(user => {
                    usersA.push({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        date: user.date
                    });
                });
            }
            const data = {
                allusers: usersA,
                adm: () => {
                    if (!req.adm) {
                        return true;
                    }
                }
            };
            // console.log(data.allusers);

            res.render('usersAdmin', data);
        });
    },
    updateuser: (id, res) => {
        // get data user to page update 
        User.findById({
            _id: id
        }, (err, user) => {
            if (err) throw err;

            if (user) {
                const userget = {
                    id: user._id,
                    username: user.username,
                    password: user.password,
                    date: user.date,
                    email: user.email,
                };

                res.render('upduseradmin', {
                    userdata: userget,
                    adm: function () {
                        if (!req.adm) {
                            return true;
                        }
                    }
                });
                // console.log(userget);
            }
        });

    },
    updateuserPost: (condaction, changpass, data, callback) => {
        if (changpass == '1') { // cheack if edit password or not
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(data.password, salt, function (err, hash) {
                    data.password = hash;
                });
            });
        }

        User.findOneAndUpdate({
            _id: condaction
        }, {
            $set: data
        }, {
            new: true,
            multi: true,
            useFindAndModify: false
        }, callback);
    },




    //Deleted User
    deltedUser: (id, res) => {
        User.findByIdAndRemove({
            _id: id
        }, (err, res) => {
            if (err) require('../config/errores').messageE.push("Something wrong when Deleted data!");
            console.log("Error: " + err);
            if (res) require('../config/errores').messageS.push("Deleted User :( ");

            // console.log("ok:" + res + "\t nModified: " + res);
        });
        res.redirect('/admin/dashboard')
    },




}