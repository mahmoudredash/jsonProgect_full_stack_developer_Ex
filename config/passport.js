const User = require('../models/user');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;


module.exports = function (passport) {


    function getUserByUsername(username, callback) {
        User.findOne({
            username: username
        }, callback);
    }

    function comparePassword(password, hash, callback) {
        bcrypt.compare(password, hash, function (err, isMatch) {
            // res === true
            if (err) throw err;
            callback(null, isMatch);
        });
    }


    passport.use(new LocalStrategy(
        function (username, password, done) {
            getUserByUsername(username, function (err, user) {
                if (err) throw err;

                if (!user) {
                    require('./errores').messageE.push("Unknown User");
                    return done(null, false, {
                        message: "Unknown User"
                    });
                }
                comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;

                    if (isMatch) {
                        require('./errores').messageS.push("Successfuly LogIn")
                        return done(null, user)
                    } else {
                        require('./errores').messageE.push("Invalid Password");
                        return done(null, false, {
                            message: "Invalid Password"
                        });
                    }
                });
            });
        }
    ));






    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}