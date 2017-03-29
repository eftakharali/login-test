
module.exports = function(app, passport) {

	// normal routes ===============================================================
		
  app.post('/register', passport.authenticate('local-signup'), {
 
    successRedirect : '/success', // redirect to the secure profile section
    failureRedirect : '/register' // redirect back to the signup page if there is an error
			
})

		/
			// process the login form
  app.post('/login', passport.authenticate('local-login'),{

				successRedirect : '/success', // redirect to the secure profile section
				failureRedirect : '/login', // redirect back to the signup page if there is an error
				
})



		// PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, (req, res) => {

  res.json({user: req.user})
			
})

		// LOGOUT ==============================
  app.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})

		// facebook -------------------------------

			// send to facebook to do the authentication
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }))

			// handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
				passport.authenticate('facebook'),  {
					successRedirect : '/success',
					failureRedirect : '/failure'
})

		// twitter --------------------------------
  
			// send to twitter to do the authentication
  app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }))

			// handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback',
				passport.authenticate('twitter', {
  successRedirect : '/success',
  failureRedirect : '/failure'
}))


		// google ---------------------------------

			// send to google to do the authentication
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }))

			// the callback after google has authenticated the user
  app.get('/auth/google/callback',
				passport.authenticate('google', {
  successRedirect : '/success',
  failureRedirect : '/failure'
}))

	// =============================================================================
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
	// =============================================================================

		// locally --------------------------------
  app.get('/connect/local', function(req, res) {
  res.render('connect-local.ejs', { message: 'loginMessage' })
})
  app.post('/connect/local', passport.authenticate('local-signup', {
  successRedirect : '/success', // redirect to the secure profile section
  failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}))

		// facebook -------------------------------

			// send to facebook to do the authentication
  app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }))

			// handle the callback after facebook has authorized the user
  app.get('/connect/facebook/callback',
				passport.authorize('facebook', {
  successRedirect : '/success',
  failureRedirect : '/'
}))

		// twitter --------------------------------

			// send to twitter to do the authentication
  app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }))

			// handle the callback after twitter has authorized the user
  app.get('/connect/twitter/callback',
				passport.authorize('twitter', {
  successRedirect : '/success',
  failureRedirect : '/'
}))




		// google ---------------------------------

			// send to google to do the authentication
  app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }))

			// the callback after google has authorized the user
  app.get('/connect/google/callback',
				passport.authorize('google', {
        successRedirect : '/success',
        failureRedirect : '/' 
    }))

	
  app.get('/success', (req, res) => {
    res.json({msg:'User authenticated'})
  })

	app.get('/failure', (req, res) => {
		res.json({msg:'Authentication failed'})
	})


}

	// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next()

  res.redirect('/failed')
}