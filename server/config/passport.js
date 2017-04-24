'use strict';

let TwitterStrategy = require('passport-twitter').Strategy;
let GoogleStrategy = require('passport-google-oauth20').Strategy;
let request = require('request');
let User = require('../models/user');
let UserModel = User.getMongooseModel();
let strHelpers = require('../helpers/stringHelpers');

/**
* Sets up passport user authenication for buffer
* @param {Passport} passport Pass the passport object into this 'class'
*/
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_REDIRECT_URI
  },
  function(token, tokenSecret, profile, done) {
    console.log('[Passport] Auth function hit. Twitter Profile: ', profile);
    UserModel.findOne({ twitterID: profile.id }, function (err, user) {
      // console.log(profile);
      if (err){
        return done(err, user);
      } else if (!user) {
        console.log('No error, user dosnt exist');
        try {
          console.log(profile.profile_image_url_https.replace('_normal', ''));
        } catch (e) {
          console.log('----Could not parse----', profile.profile_image_url_https);
          console.log('----Could not parse----', profile._json);
        }

        user = new UserModel({
          userID: strHelpers.randomString(20),
          twitterID: profile.id,
          googleID: null,
          email: null,
          firstName: strHelpers.splitString(profile.displayName)[0],
          lastName: strHelpers.splitString(profile.displayName)[1],
          recieveEmail: false,
          recievePush: false,
          accessToken: token,
          refreshToken: tokenSecret,
          profilePhoto: profile._json.profile_image_url_https.replace('_normal', ''),
          trackedEvents: [],
          trackedOrgs: User.defaulTrackedOrgs()
        });
      }

      user.save(function(err) {
          if (err) {
            console.log(err);
          }
          return done(err, user);
      });
    });
  }));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('[Passport] Auth function hit. Google Profile: ', profile);
    UserModel.findOne({ googleID: profile.id }, function (err, user) {
      if (err){
        console.log('[Passport] User exists: ', user);
        console.log('[Passport] User exists (profile)', user);
        return done(err, user);
      } else if (!user) {
        console.log('No error, user dosnt exist', profile.photos[0].value);
        user = new UserModel({
          userID: strHelpers.randomString(20),
          twitterID: null,
          googleID: profile.id,
          email: null,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          recieveEmail: false,
          recievePush: false,
          accessToken: accessToken,
          refreshToken: refreshToken,
          profilePhoto: profile.photos[0].value.replace('sz=50', ''),
          trackedEvents: [],
          trackedOrgs: User.defaulTrackedOrgs()
        });
      }

      user.save(function(err) {
          if (err) {
            console.log(err);
          }
          return done(err, user);
      });
    });
  }
));
};
