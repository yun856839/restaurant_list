const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

db.once('open', () => {
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