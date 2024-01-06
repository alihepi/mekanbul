require('dotenv').config();
var express = require('express');
var path = require('path');
var cors = require("cors");

var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./app_api/models/db");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require("./app_api/routes/index");

const passport = require("passport");
require("./app_api/config/passport");

var app = express();

app.use(passport.initialize());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRouter);
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    if (err.name == "UnauthorizedError")
        res.status(401).json({ status: "Doğrulama Tokeni Bulunamadı!" });
});

module.exports = app;
