const Entity = require('../common/factories/Entity')
const PersonName = require('../common/factories/PersonName')

class Profile extends Entity {
  constructor (id, data) {
    super(id)
    this.personName = new PersonName(data.personName)
  }
}

module.exports = Profile
