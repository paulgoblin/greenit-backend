'use strict';

const PORT         = process.env.PORT || 3000
    , express      = require('express')
    , bodyParser   = require('body-parser')
    , morgan       = require('morgan')
    , cookieParser = require('cookie-parser')
    , cors         = require('cors')
    , compression  = require('compression')
    , path         = require('path')
    , mongoose     = require('mongoose')
    , mongoUrl     = process.env.MONGOLAB_URI || 'mongodb://localhost/greenit';


mongoose.connect(mongoUrl)

var app = express();

//cors
var whitelist = ['http://paulgoblin.github.io', 'http://localhost:8000'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};
app.use(cors(corsOptions));

//VIEWS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// GENERAL MIDDLEWARE
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(cookieParser())

// ROUTES
app.use('/users', require('./routes/users'));
app.use('/topics', require('./routes/topics'));
app.use('/comments', require('./routes/comments'));
app.use('/', require('./routes/index'));

// 404 HANDLER
app.use(function(req, res){
  res.status(404).send('route not found')
})

//Listen
app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
