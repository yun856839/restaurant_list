const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting 
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
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
    return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  })
  res.render('index', { restaurant: restaurants, keyword: keyword })
})

//start and listen the Express server
app.listen(port, () => {
  console.log(`Express is Listening on localhost: ${port}`)
})