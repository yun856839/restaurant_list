const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const name = req.query.name
  const sort = req.query.sort
  // console.log(req.query)
  // console.log({ [name]: sort })
  let current = ''
  if (name === 'name' && sort === 'asc') {
    current = 'A -> Z'
  } else if (name === 'name' && sort === 'desc') {
    current = 'Z -> A'
  } else if (name === 'category') {
    current = '類別'
  } else if (name === 'location') {
    current = '地區'
  }
  Restaurant.find()
    .lean()
    .sort({ [name]: sort })
    .then(restaurants => res.render('index', { restaurants, current }))
    .catch(error => console.error(error))
})

module.exports = router