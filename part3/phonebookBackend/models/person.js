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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{6,}/.test(v)
      },
      message: (props) => { `${props.value} is not a valid number` }
    },
    minLength: 8,
    required: true,
  },
})
personSchema.set('toJSON', {
  transform: (doc, returnedPerson) => {
    returnedPerson.id = returnedPerson._id.toString()
    delete returnedPerson._id
    delete returnedPerson.__v
  }
})
module.exports = mongoose.model('Person', personSchema)

