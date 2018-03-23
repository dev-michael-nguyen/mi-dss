const Profile = require('./Profile')

const routerFactory = require('../common/routers/factory')

const router = routerFactory.create(Profile, {
  postRoute: ['/profiles/'],
  getRoute: ['/profiles/', '/profiles/:id'],
  putRoute: ['/profiles/:id']
})

module.exports = router
