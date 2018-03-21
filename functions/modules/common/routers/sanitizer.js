// https://github.com/punkave/sanitize-html
const sanitizeHtml = require('sanitize-html')

function clean (obj, options) {
  Object.keys(obj).forEach(key => {
    var value = obj[key]
    console.log(value)
    if (typeof value === 'string') {
      obj[key] = sanitizeHtml(value, options)
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      clean(value, options)
    }
    // if (typeof value === 'object' && Array.isArray(value)) {
    //   // TBI
    // }
  })

  return obj
}

function cleanStrict (obj) {
  return clean(obj, { allowedTags: [], allowedAttributes: [] })
}

const sanitizer = Object.freeze({ clean, cleanStrict })

module.exports = sanitizer
