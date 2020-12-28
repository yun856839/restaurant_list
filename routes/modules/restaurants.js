const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 搜尋
router.get('/searches', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLocaleLowerCase()
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => restaurants.filter(restaurant => {
      return restaurant.name.toLocaleLowerCase().includes(keyword) || restaurant.category.toLocaleLowerCase().includes(keyword)
    }))
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.error(error))
})

// 分類
router.get('/sort', (req, res) => {
  const userId = req.user._id
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
  } else if (name === 'rating') {
    current = '評分'
  }
  Restaurant.find({ userId })
    .lean()
    .sort({ [name]: sort })
    .then(restaurants => res.render('index', { restaurants, current }))
    .catch(error => console.error(error))
})

// 詳細頁面(show.hbs) params :
router.get('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 編輯頁面(edit.hbs)
router.get('/:restaurant_id/edit', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// 刪除頁面
router.delete('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router