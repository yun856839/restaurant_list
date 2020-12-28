const express = require('express')
const router = express.Router()

const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.locals.error_msg = req.flash('error')
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '兩次密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已註冊' })
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }

    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))

  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已經成功登出')
  res.redirect('/users/login')
})

module.exports = router