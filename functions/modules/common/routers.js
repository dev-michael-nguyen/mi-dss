// Using Firebase Admin SDK to access Firebase Realtime Database.
// NOTE: It will be initialized with default admin privilege and bypass database rule.
//       Config with service account as needed: https://firebase.google.com/docs/admin/setup?authuser=0
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const db = admin.database()

// Res status cheatsheet
const resStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}

// Use on route that need to be authenticated
const authenticate = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(resStatus.UNAUTHORIZED).json({ error: `${resStatus.UNAUTHORIZED}: No authorization header.` })
  }

  const idToken = req.headers.authorization.split('Bearer ')[1]
  return admin.auth().verifyIdToken(idToken)
    .then((decodedUser) => {
      req.user = decodedUser
      return next()
    })
    .catch((error) => {
      console.error(error)
      return res.status(resStatus.UNAUTHORIZED).json({ error: `${resStatus.UNAUTHORIZED}: ${error.message}` })
    })
}

module.exports = {
  db,
  resStatus,
  authenticate
}
