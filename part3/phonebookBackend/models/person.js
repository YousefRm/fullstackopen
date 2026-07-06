const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
console.log('connecting to the mongo database...')
mongoose.connect(url, { family: 4 }).then(result => {
  console.log('connecting to database successful')
}).catch(error => {
  console.log('error connecting to the database', error.message)
})
const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})
personSchema.set('toJSON', {
  transform: (doc, returnedPerson) => {
    returnedPerson.id = returnedPerson._id.toString()
    delete returnedPerson._id
    delete returnedPerson.__v
  }
})
module.exports = mongoose.model('Person', personSchema)

