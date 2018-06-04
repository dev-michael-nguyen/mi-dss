const Entity = require('../common/classes/Entity')
const PersonName = require('../common/classes/PersonName')

class Profile extends Entity {
  constructor (id, data) {
    super(id)
    data = data || {}
    this.personName = new PersonName(data.personName)
    this.birthDate = data.birthDate || ''
  }
}

module.exports = Profile
