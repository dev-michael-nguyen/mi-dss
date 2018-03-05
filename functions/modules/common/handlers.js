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
const admin = require('firebase-admin')
const authenticate = (req, res, next) => {
  // Set CORS our POST response so it worked on codepen
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

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
  resStatus,
  authenticate
}
