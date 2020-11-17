// querystring ?
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
      restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  })
  res.render('index', { restaurant: restaurants, keyword: keyword })
})
