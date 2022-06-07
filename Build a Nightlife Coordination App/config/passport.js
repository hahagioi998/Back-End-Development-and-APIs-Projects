var LocalStratey = require('passport-local').Strategy;
var User = require('../model/user.js');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    //signup local strategy
    passport.use('local-signup', new LocalStratey({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({ "local.username": email }, function (err, user) {
                if (err) {
                    return done(err);
                } if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email already taken'));
                } else {
                    var newUser = new User();
                    newUser.local.username = email;
                    newUser.local.password = newUser.genHash(password);
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    //Login local strategy
    passport.use('local-login', new LocalStratey({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({ "local.username": email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No User Found'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Wrong Password'));
                }
                return done(null, user);
            });
        });
    }));
} 