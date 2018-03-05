// Using Express App for routing
const express = require('express')
const app = express()

const profiles = require('./modules/profile/handlers')
app.use(profiles)

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
