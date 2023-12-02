var createError = require('http-errors');

import userRouter from './routes/users'; 

import noteRouter from './routes/notes'; 

import express from 'express';

import cors from 'cors';

import logger from 'morgan';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import sequelize from './models/config';
import authRoutes from './routes/auth';
import noteRoutes from './routes/notes';
import userRoutes from './routes/users';

var path = require('path');

/*
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
*/

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());  //this parses the body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes); // Authentication routes
app.use('/notes', noteRoutes); // Notes routes
app.use('/users', userRoutes); // Users routes

app.use('/', userRouter);
app.use('/notes', noteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

dotenv.config(); // configure dotenv file

// error handler

/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

export default app
