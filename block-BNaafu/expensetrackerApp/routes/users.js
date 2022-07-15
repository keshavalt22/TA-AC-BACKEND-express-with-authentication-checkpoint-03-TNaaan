var express = require('express');
var router = express.Router();
var User = require('../models/users');
var auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) return next(err);
    res.redirect('/users/login');
  })
});

router.get('/login', (req, res, next) => {
  var error = req.flash('error')[0];
  res.render('login', {error});
});

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if(!email || !password) {
    req.flash('error', 'Email/Password required');
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if(err) return next(err);
    //no user
    if(!user) {
      req.flash('error', 'Invalid Email');
      return res.redirect('/users/login');
    }
    //compare password
    user.verifyPassword(password, (err, result) => {
      if(err) return next(err);
      if(!result) {
        req.flash('error', 'Invalid Password');
        return res.redirect('/users/login');
      }
      //persist logged in user information
      req.session.userId = user.id;
      res.redirect("/users/dashboard")
    })
  })
});

router.use(auth.loggedInUser);

router.get('/dashboard', (req, res, next) => {
  let userId = req.session.userId || req.session.passport.user;
  User.findOne({_id: userId }, (err, user) => {
    if(err) return next(err);
          res.render('dashboard', { user: user });
        })
    });

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie();
  res.redirect('/');
});

module.exports = router;
