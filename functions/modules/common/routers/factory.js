const express = require('express')

const db = require('./admin').database()
const resStatus = require('./res-status')
const sanitizer = require('./sanitizer')

function fixPostData (EntityFactory, postData) {
  return JSON.parse(JSON.stringify(new EntityFactory(null, postData), (k, v) => {
    if (v === undefined) { return null }
    return v
  }))
}

function create (EntityFactory, routes) {
  const router = express.Router()

  const { postRoutes, putRoutes, getRoutes } = routes

  router.post(
    postRoutes,
    (req, res) => {
      if (!req.body) {
        return res.status(resStatus.BAD_REQUEST).json({ error: `${resStatus.BAD_REQUEST}: No Data` })
      }

      // For post request, we want full entity structure
      // NOTE: Firebase wont handle undefined so we need to convert undefined to null
      //       Firebase wont store null value so data that is stored will be minimal set
      const data = sanitizer.cleanStrict(req.body)
      const fixedData = fixPostData(EntityFactory, data)
      const entity = new EntityFactory(null, fixedData)

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

  router.put(
    putRoutes,
    (req, res) => {
      if (!req.body) {
        return res.status(resStatus.BAD_REQUEST).json({ error: `${resStatus.BAD_REQUEST}: No Data` })
      }

      // For put request, we dont want full entity structure
      // NOTE: Firebase will do smart update on properties that has value
      //       Null value will update old value to be empty string
      //       Property that has undefined value will be completely remove
      const data = sanitizer.cleanStrict(req.body)

      return db.ref(req.fullPath)
        .update(data)
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

  router.get(
    getRoutes,
    (req, res) => {
      // If query for an empty entity, return an empty entity model
      if (req.query.getEmptyEntity) {
        const entity = new EntityFactory()
        return res.status(resStatus.OK).json(entity)
      }

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

  return router
}

const factory = Object.freeze({ create })

module.exports = factory
