const mongoose = require('mongoose')
const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurant')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(Object.assign(restaurantList.results, restaurantList))
  // restaurantList.results.forEach((rest) => {
  //   Restaurant.create({
  //     name: rest.name,
  //     name_en: rest.name_en,
  //     category: rest.category,
  //     image: rest.image,
  //     location: rest.location,
  //     phone: rest.phone,
  //     google_map: rest.google_map,
  //     rating: rest.rating,
  //     description: rest.description
  //   })
  // })
  console.log('done')
})