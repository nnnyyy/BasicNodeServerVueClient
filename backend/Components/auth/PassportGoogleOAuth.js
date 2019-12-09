const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const appConf = require('../../config/appConf');
var debug = require('debug')('backend:server');


passport.serializeUser(function(user, done) {    
    done(null, user);
  });
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: appConf.googleAuth.clientID,
    clientSecret: appConf.googleAuth.clientSecret,
    callbackURL: appConf.googleAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.accessToken = accessToken;
      debug("google passport strategy result", profile);
      return done(null, profile);
    });
  }
));

exports.init = function( app ) {
    //  세션 초기화는 이미 이루어져 있어야 한다.
    app.use(passport.initialize())
    app.use(passport.session())

    app.get('/auth/google', passport.authenticate('google', { scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'], accessType: 'offline', approvalPrompt: 'force' }), (req,res)=> {})
    app.get(appConf.googleAuth.callbackURL, passport.authenticate('google', { failureRedirect: '/login' }), callbackFunc)
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });
}

//  인증에 성공했을 때 오는 콜백 함수
const callbackFunc = function(req, res) {
  console.log('callback called')
  res.redirect('/')
}