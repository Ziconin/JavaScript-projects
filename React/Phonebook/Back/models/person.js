const mongoose = require('mongoose')
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const dbUrl = process.env.MONGODB_URI
mongoose.connect(dbUrl, {useNewUrlParser: true})

const schema = new mongoose.Schema({
  name: String,
  number: String
})

schema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

schema.path('name').validate(function(value, res) {
  return mongoose.model('Person').countDocuments({name: value}).exec().then(function(count) {
    return !count
  })
  .catch(function(err) {
    throw err
  })
}, 'Validation failed: Name already in list')

const Person = mongoose.model('Person', schema)

module.exports = Person
