// Using Firebase Admin SDK to access Firebase Realtime Database.
// NOTE: It will be initialized with default admin privilege and bypass database rule.
//       Config with service account as needed: https://firebase.google.com/docs/admin/setup?authuser=0
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

module.exports = admin
