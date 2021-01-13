const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const restaurantList = require('../../restaurant.json').results
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  SEED_USERS.forEach((user, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        email: user.email,
        password: hash
      }))
      .then(user => {
        return Promise.all(
          Array.from({ length: 3 }, (_, i) => {
            return Restaurant.create(Object.assign(restaurantList[i + index * 3], { userId: user._id }))
          })
        )
      })
      .then(() => {
        console.log('done')
        process.exit()
      })
  })
})


