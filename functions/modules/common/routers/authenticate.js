const admin = require('./admin')
const resStatus = require('./res-status')

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

module.exports = authenticate
