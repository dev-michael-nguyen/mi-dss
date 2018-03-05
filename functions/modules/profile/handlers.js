const express = require('express')
const router = express.Router()

// Using Firebase Admin SDK to access Firebase Realtime Database.
// NOTE: It will be initialized with default admin privilege and bypass database rule.
//       Config with service account as needed: https://firebase.google.com/docs/admin/setup?authuser=0
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const db = admin.database()

// Res status cheatsheet
const resStatus = require('../common/handlers').resStatus

// Enable CORS on request
// const cors = require('cors')({origin: true})
// router.use(cors)

router.get(
  ['/profiles/', '/profiles/:id'],
  (req, res) => {
    return db.ref(req.fullPath)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val()
        return res.status(resStatus.OK).json(data)
      })
      .catch((error) => {
        console.error(error)
        return res.status(resStatus.SERVER_ERROR).json({ error: `${error.code}: ${error.message}` })
      })
  }
)

module.exports = router
