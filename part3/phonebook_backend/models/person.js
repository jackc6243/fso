const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
console.log('connecting to mongodb')

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function (n) {
        console.log('validating phone number')
        console.log(n)

        if (n.length < 8) {
          return false
        }
        let a = 0
        for (const chr of n) {
          if (isNaN(chr)) {
            console.log(chr)
            if (chr === '-') {
              a += 1
            } else {
              return false
            }
          }
        }
        console.log('-:', a)
        return !(a > 2)
      },
      message: 'Invalid phone number'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('person', personSchema)
