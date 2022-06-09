const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
//routes
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/tasks.route");
const app = express();
const mongoConfig = require('./mongo');
require('dotenv').config();
const DEBUG=+process.env.DEBUG;
(
  async()=>{
    try{
      await mongoConfig.connect();
  }
  catch(err){
      if(DEBUG){
          console.log(`Error connecting MongoDB ${err}`);
      }
  }

  app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  
  app.use("/auth", authRoute);
  app.use("/task", taskRoute);

  app.listen(process.env.BACKEND_PORT, () => {
    if(DEBUG)
    console.log(`Server is running on ${process.env.BACKEND_PORT}`);
  });
  }
  
)();

