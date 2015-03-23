var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

//serialize and deserialize users - persistant login support
module.exports = function (passport) {

	passport.serializeUser(function (user, done){
		//console.log('serialize user: ' + user);
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done){
		User.findById(id, function (err, user){
			//console.log('deserialize user:' + user );
			done(err, user);
		});
	});

	// Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
}