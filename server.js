'use strict';

const PORT = process.env.PORT || 3000
    , express = require('express')
    , bodyParser = require('body-parser')
    , morgan = require('morgan')
    , cookieParser = require('cookie-parser')
    , cors = require('cors')
    , mongoose = require('mongoose')
    , mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/greenit';


mongoose.connect(mongoUrl)

var app = express();

//cors
app.use(cors());

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static('public'));

// ROUTES
app.use('/users', require('./routes/users'));

// 404 HANDLER
app.use(function(req, res){
  res.status(404).send('route not found')
})

//Listen
app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
