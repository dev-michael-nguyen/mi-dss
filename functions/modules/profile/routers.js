const express = require('express')
const router = express.Router()

const commonRouters = require('../common/routers')
const db = commonRouters.db
const resStatus = commonRouters.resStatus

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
