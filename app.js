var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter=require('./routes/user');
const tweetRouter=require("./routes/tweet");

var app = express();
// express use functions
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/tweets', {useNewUrlParser: true}).then(() => {
    console.log('db connected');
}).catch((err) => {
    console.log(err);
});

app.use('/users', usersRouter);
app.use('/tweet', tweetRouter);

module.exports = app;
