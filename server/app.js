const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { db } = require('./models')

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req,res,next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})
app.use(function(err,req,res,next){
  res.status(err.status || 500);
  console.error(err);
  res.send( "Server is broken" )
})

app.get('/',()=>{})

const port = 3000;
app.listen(port, function() {
  console.log("The server is listening closely on port ", port);
  db.sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});
