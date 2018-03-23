const express = require('express')

const db = require('./admin').database()
const resStatus = require('./res-status')
const sanitizer = require('./sanitizer')

function create (EntityFactory, routes) {
  const router = express.Router()

  const { postRoute, getRoute, putRoute } = routes

  router.post(
    postRoute,
    (req, res) => {
      if (!req.body) {
        return res.status(resStatus.BAD_REQUEST).json({ error: `${resStatus.BAD_REQUEST}: No Data` })
      }

      const entity = new EntityFactory(null, sanitizer.cleanStrict(req.body))

      return db.ref(req.fullPath)
        .push(entity)
        .then((dbRef) => {
          return dbRef.ref.once('value')
        })
        .then((snapshot) => {
          const entity = new EntityFactory(snapshot.key, snapshot.val())
          return res.status(resStatus.CREATED).json(entity)
        })
        .catch((error) => {
          console.error(error)
          return res.status(resStatus.SERVER_ERROR).json({ error: `${error.code}: ${error.message}` })
        })
    }
  )

  router.get(
    getRoute,
    (req, res) => {
      return db.ref(req.fullPath)
        .once('value')
        .then((snapshot) => {
          if (req.params.id) {
            const entity = new EntityFactory(snapshot.key, snapshot.val())
            return res.status(resStatus.OK).json(entity)
          } else {
            const entities = []
            snapshot.forEach(s => {
              entities.push(new EntityFactory(s.key, s.val()))
            })
            return res.status(resStatus.OK).json(entities)
          }
        })
        .catch((error) => {
          console.error(error)
          return res.status(resStatus.SERVER_ERROR).json({ error: `${error.code}: ${error.message}` })
        })
    }
  )

  router.put(
    putRoute,
    (req, res) => {
      if (!req.body) {
        return res.status(resStatus.BAD_REQUEST).json({ error: `${resStatus.BAD_REQUEST}: No Data` })
      }

      const entity = new EntityFactory(null, sanitizer.cleanStrict(req.body))

      return db.ref(req.fullPath)
        .update(entity)
        .then(() => {
          return db.ref(req.fullPath).once('value')
        })
        .then((snapshot) => {
          const entity = new EntityFactory(snapshot.key, snapshot.val())
          return res.status(resStatus.OK).json(entity)
        })
        .catch((error) => {
          console.error(error)
          return res.status(resStatus.SERVER_ERROR).json({ error: `${error.code}: ${error.message}` })
        })
    }
  )

  return router
}

const factory = Object.freeze({ create })

module.exports = factory
