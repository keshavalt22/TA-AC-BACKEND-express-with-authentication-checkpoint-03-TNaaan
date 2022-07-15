var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/failure', (req, res, next) => {
  res.render('failure');
});

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/failure'
}));

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',passport.authenticate('github', 
  {failureRedirect: '/failure'}), (req, res) => {
    res.redirect('/users/dashboard');
});

module.exports = router;

