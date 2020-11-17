const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// querystring ?
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim().toLocaleLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurants => restaurants.filter(restaurant => {
      return restaurant.name.toLocaleLowerCase().includes(keyword) ||
        restaurant.category.toLocaleLowerCase().includes(keyword)
    }))
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.error(error))
})

module.exports = router