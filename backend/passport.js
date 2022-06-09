const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const userModel = require('./models/user.model');
const DEBUG=+process.env.DEBUG;
require('dotenv').config();

const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;

GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const name = profile._json.name;
      const email = profile._json.email;
      //check if user already exist
      try{
        user = await userModel.findOne({email});
    } 
    catch(err){
        if(DEBUG){
            console.log(`Error finding user when creating a new blog ${err}`);
        }
    }

    //if user doesn't exist then add in database otherwise continue
    if(!user){
        //creating a new user using mongoose
        const user = new userModel({
          name,
          email
      });
  let error=null;
  try{
      //saving data to database using mongoose
      const returnedData = await user.save();
      if(process.env.DEBUG)console.log(`Returned data after signup ${returnedData}`);
  }
  catch(err){
      if(process.env.DEBUG){
          console.log(`Error creating a new user ${err.message}`);
      } 
  }
    }
            
      //console.log(profile);
      //console.log(profile._json.name);
      //console.log(profile._json.email);
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
