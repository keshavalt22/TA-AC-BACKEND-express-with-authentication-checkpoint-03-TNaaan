var User = require('../models/users');


module.exports = {
    loggedInUser: (req, res, next) => {
        if(req.session && req.session.userId) {
            next();
        } else if(req.session && req.session.passport) {
            next()
        } else {
            res.redirect('/users/login');
        }
    },
    userInfo: (req, res, next) => {
        if(req.session.userId) {
            var userId = req.session && req.session.userId;
            User.findById(userId, "name email", (err, user) => {
                if(err) return next(err);
                req.user = user;
                res.locals.user = user;
                next();
            });
        } else if(req.session.passport) {
            let userId = req.session && req.session.passport.user;
            User.findById(userId, "name email", (err, user) => {
                if(err) return next(err);
                req.user = user;
                res.locals.user = user;
                next();
            });
        }
        else {
            req.user = null;
            res.locals.user = null;
            next();
        }
    }
};