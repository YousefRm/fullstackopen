const mongoose = require('mongoose')
const procLength = process.argv.length
if (procLength < 5 && procLength !== 3) {
  console.log('error information missing')
  process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://youssef8243_db_user:${password}@cluster0.oqtbuot.mongodb.net/persons?appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = mongoose.Schema({
  name: String,
  phone: String,
})
const Person = mongoose.model('Person', personSchema)

if (procLength === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.phone)
    })
    mongoose.connection.close()
  })
}

const name = process.argv[3]
const phone = process.argv[4]

const person = new Person({
  name: name,
  phone: phone,
})

person.save().then(request => {
  console.log(`added ${name} number ${phone} to phonebook `)
  mongoose.connection.close()
})
