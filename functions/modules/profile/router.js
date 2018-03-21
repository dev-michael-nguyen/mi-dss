const express = require('express')
const router = express.Router()

const admin = require('../common/routers/admin')
const db = admin.database()
const resStatus = require('../common/routers/resStatus')

const Profile = require('./Profile')

router.get(
  ['/profiles/', '/profiles/:id'],
  (req, res) => {
    return db.ref(req.fullPath)
      .once('value')
      .then((snapshot) => {
        if (req.params.id) {
          const profile = new Profile(snapshot.key, snapshot.val())
          return res.status(resStatus.OK).json(profile)
        } else {
          const profiles = []
          snapshot.forEach(s => {
            profiles.push(new Profile(s.key, s.val()))
          })
          return res.status(resStatus.OK).json(profiles)
        }
      })
      .catch((error) => {
        console.error(error)
        return res.status(resStatus.SERVER_ERROR).json({ error: `${error.code}: ${error.message}` })
      })
  }
)

module.exports = router
