const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// get all api route
const api = require('./src/routes/index');
const config = require('./config');

// Set up the express app
const app = express();

//connect db cloud.mongodb.com
mongoose.connect(
  `mongodb+srv://admin:${config.MONGODB_ATLAS_PW}@cluster0-ia7f4.mongodb.net/test?retryWrites=true`,
 {
    useNewUrlParser: true,
  }
);

// Log requests to the console.
app.use(logger('dev'));

//setup bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With,Content-Type, Accept,Authorization'
  );
  if(req.method=== 'OPTIONS'){
      res.header(
          'Access-Control-Allow-Methods', 
          'PUT, POST, PATCH, DELETE, GET'
      )
      return res.status(200).json({});    
  }
  next();
});

app.use((req, res,next)=>{
  const error = new Error('Not Found');
  error.status=404;
  next(error);
});

app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
      error:{
          message:error.message
      }
  });
});

module.exports = app;