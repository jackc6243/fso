const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://jackc6243:${password}@test.cmjbcnv.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    console.log('transformed')
    // returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    return returnedObject
  }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.toJSON().forEach(p => {
      console.log(p)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length < 5) {
  console.log('please provide number')
  process.exit(1)
} else {
  const newPerson = new Person({ name: process.argv[3], number: process.argv[4] })
  newPerson.save().then(result => {
    console.log(`Added ${result.name} ${result.number} into the phonebook`)
    mongoose.connection.close()
  })
}
