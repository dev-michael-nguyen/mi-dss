const Profile = require('./Profile')

const routerFactory = require('../common/routers/factory')

const router = routerFactory.create(Profile, {
  postRoutes: ['/profiles/'],
  putRoutes: ['/profiles/:id'],
  getRoutes: ['/profiles/', '/profiles/:id']
})

module.exports = router
