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

// mongoose.connect('mongodb://localhost:27017/anidopt');

//View engine config
app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');

// function defaultContentTypeMiddleware (req, res, next) {
//   req.headers['content-type'] = req.headers['content-type'] || 'application/json';
//   next();
// }

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
app.post('/api/addProd', serverController.addProduct);
app.get('/api/inventory', serverController.getInventory);
app.put('/api/inventory/:_id', serverController.editInventory);
app.get('/redirectHome', serverController.getHome);
// app.use('/image', express.static(__dirname));
// app.use(stylus.middleware({
// 	src: __dirname + '/css',
// 	dest: __dirname + '/css',
// 	debug: true,
// 	force: true
// }));

// var server = exports.server = http.createServer(app).listen(3000, function () {
// 		console.log("Server is listening...");
// });

// var io = require('socket.io').listen(server);
// //for debug
// //io.set("log level", 0);
// var post_id;
// //listener
// io.sockets.on('connection', function (socket){
// 	console.log("connected to socket");

// 	socket.on('post:id', function (id){
// 		post_id = id;
// 		//Give Server controller the id for Image Post
// 		serverController.postId(id);
// 		console.log('server.js has ID: ' + post_id);
// 	})


	// socket.on('post:id', function (id, callback){
	// 	callback = callback || function () {};
	// 	//console.log("server.js: " + id);
	// 	var post_id = id;
	// 	callback(null, "Done.");
	// });

// })

//get route
// app.get('/', routes);
// app.get('/search', search);
// app.get('/login', login);
// app.get('/dogs', dogs);
// app.get('/fish', fish);
// app.get('/birds', birds);
// app.get('/reptiles', reptiles);
// app.get('/small_animals', small_animals);
// app.get('/forum', forum);
// app.get('/list', list);

//REST API Routes
// app.post('/api/inventory', serverController.postProduct);
// app.get('/api/inventory', serverController.getInventory);
// app.get('/api/inventory/:id', serverController.getProductBySKU);
// app.delete('/api/inventory/:id', serverController.deleteList);
// app.put('/api/listing/:id', serverController.updateList);
// app.post('/api/image/', [multer({ 
// 	dest: './server/uploads/',
// 		rename: function (fieldname, filename) {
// 		return filename+Date.now();
// 		}
// 	}), serverController.uploadImagePath
// ]);


//Start server on port 3000
app.listen(process.env.PORT || 3000, function () {
	console.log("Server is listening...");
});