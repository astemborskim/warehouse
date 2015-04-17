var express = require('express'),
	mongoose = require('mongoose'),
	dbConfig = require('./server/db/db.js'),
	bodyparser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	stylus	= require('stylus'),
	// multer = require('multer'),
	// io = require('socket.io'),
	http = require('http'),
	serverController = require('./server/controllers/server-controller');

var app = express();

//DB connection
mongoose.connect(dbConfig.url);

//View engine config
app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');

// app.use(defaultContentTypeMiddleware);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/client/'));

//Configure Passport Authentication
var passport = require('passport');
//Session Handling
var expressSession = require('express-session');
app.use(expressSession({secret : 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./server/passport/init');
initPassport(passport);

//routes defined
var routes = require('./client/js/routes/index')(passport);
app.use('/', routes);

//REST API Routes
app.post('/api/addProd', serverController.addProduct); //add new product
app.get('/api/inventory', serverController.getInventory); //get all products
app.put('/api/inventory/:_id', serverController.editInventory); //edit a single product
app.get('/api/item/:_id', serverController.getOneItem); //git one product by SKU


//Start server on port 3000
app.listen(process.env.PORT || 3000, function () {
	console.log("Server is listening...");
});