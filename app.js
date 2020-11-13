const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))

// routes setting 
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
  // res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// params :
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// querystring ?
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
      restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  })
  res.render('index', { restaurant: restaurants, keyword: keyword })
})

//start and listen the Express server
app.listen(port, () => {
  console.log(`Express is Listening on localhost: ${port}`)
})