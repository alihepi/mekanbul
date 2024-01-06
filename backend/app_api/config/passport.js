const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("user");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        (email, password, done) => {
            User.findOne({email: email}).then((user) => {
                if(!user || !user.checkPassword(password)){
                    return done(false);
                } else return done(user);
            });
        }
    )
);