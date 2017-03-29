// server.js

// set up ======================================================================
// get all the tools we need
const express  = require('express')
const app      = express()
const port     = process.env.PORT || 8080
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const configDB = require('./config/database.js')
const cors = require('cors')

// configuration ===============================================================
mongoose.connect(configDB.url) // connect to our database

require('./config/passport')(passport) // pass passport for configuration


app.use(express.static(path.join(__dirname, 'public')))

// set up our express application
app.use(cors())
app.use(express.logger('dev')) // log every request to the console
app.use(express.cookieParser()) // read cookies (needed for auth)
app.use(express.bodyParser()) // get information from html forms


// required for passport
app.use(express.session({ secret: 'eftisecret' })) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

// routes ======================================================================
require('./app/routes.js')(app, passport) // load our routes and pass in our app and fully configured passport

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.get('*', function(req, res) {
  res.redirect('/')
})
// launch ======================================================================
app.listen(port)
console.log('Server is running at ' + port)
