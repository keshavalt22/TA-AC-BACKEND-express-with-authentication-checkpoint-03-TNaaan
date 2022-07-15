var passport = require('passport');
var User = require('../models/users');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var GitHubStrategy = require('passport-github').Strategy;


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    var profileData = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo:profile._json.avatar_url
    }
    User.findOne({email: profile._json.email}, (err, user) => {
        if(err) return done(err);
        if(!user) {
            User.create(profileData, (err, addedUser) => {
                if(err) return done(err);
                return done(null, addedUser);
            })
        }else{
            done(null, user);
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( function (userId, done) {
    User.findById(userId,'name email username', function(err, user) {
        done(err, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback   : true
  }, (request, accessToken, refreshToken, profile, done) => {
    var profileData = {
        name: profile.displayName,
        email: profile.email
    }
    User.findOne({email: profile.email}, (err, user) => {
        if(err) return done(err);
        if(!user) {
            User.create(profileData, (err, addedUser) => {
                if(err) return done(err);
                return done(null, addedUser);
            })
        } else { done(null, user) };
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId, function(err, user) {
        done(err, user);
    })
})