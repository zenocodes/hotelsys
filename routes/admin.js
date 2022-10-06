var express = require('express');
const app = require('../app');
var router = express.Router();

const adminCredentials = {
  email: 'admin@hotelsys.com',
  password: 'test@1234!'
}

/* admin dashboard */
router.get('/', function(req, res, next) {
  if (res.locals.isLoggedIn) {
    res.render('admin/dashboard', {title: 'Dashboard'});
  } else {
    res.redirect('/admin/login')
  }
});

// display admin login page
router.get('/login', (req, res, next) => {
    if (res.locals.isLoggedIn) {
      res.redirect('/admin')
    } else {
      const admin = {
        email: '',
        password: ''
      }
      res.render('admin/login', {title: 'Login', admin: admin, error: false})
    }
})

// submit admin login page
router.post('/login', (req, res, next) => {
  const admin = {
    email: req.body.email,
    password: req.body.password
  }

  if (adminCredentials.email === admin.email) {
    if (adminCredentials.password === admin.password) {
      req.session.user = 'admin'
      res.redirect('/admin')
    } else {
      let message = 'Incorrect password.'
      res.render('admin/login', {title: 'Login', admin: admin, error: true, message: message})
    }
  } else {
    let message = 'Email does not exist.'
    res.render('admin/login', {title: 'Login', admin: admin, error: true, message: message})
  }

})

// logout functionality
router.get('/logout', (req, res) => {
  // destroy session
  req.session.destroy(() => {
    res.redirect('/admin/login')
  })
})

module.exports = router;
