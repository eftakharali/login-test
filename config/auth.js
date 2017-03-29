// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1449476215092215', // your App ID
		'clientSecret' 	: '28c4ba77d3d34977374e0043fbc71a02', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'UrrurMqlkcRnyHAqbKgMFN9rR',
		'consumerSecret' 	: 'o7RDZCnsWDJCQJmJjTrf6VdcniCPVJBvZEN5U3tYZ8nEbGsFxY',
		'callbackURL' 		: '/auth/twitter/callback'//'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-secret-clientID-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};
