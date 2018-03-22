// Using Express App for routing
const express = require('express')
const app = express()

// Enable CORS on all requests and responses
// NOTE: This will allow our web application to communicate with our API if they are not hosted on the same domain
const cors = require('cors')({origin: true})
app.use(cors)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  return next()
})

// Setting up route for our modules
const profileRouter = require('./modules/profile/router')
app.use(profileRouter)

// Set routes under 'app' function base url which is /app
// Set up Firebase Realtime Database base url to /app for easy integration
const functions = require('firebase-functions')
exports.app = functions.https.onRequest((req, res) => {
  // Fix routing for empty req path
  if (!req.path) {
    req.url = `/${req.url}`
  }

  // Save the full path so we can use them for Firebase Realtime Database ref
  // NOTE: If database baseUrl is not the same as our function then config it here
  const dbBaseUrl = 'app'
  req.fullPath = `${dbBaseUrl}${req.url}`

  return app(req, res)
})
