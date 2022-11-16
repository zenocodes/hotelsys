var express = require('express');
var multer = require('multer')
const app = require('../app');
const connection = require('../db-config')
var router = express.Router();
const uploads = multer({dest: 'public/uploads/'})

const adminCredentials = {
  email: 'admin@hotelsys.com',
  password: 'test@1234!'
}

/* admin dashboard */
router.get('/', function(req, res, next) {
  if (res.locals.isLoggedIn) {

    let sql = 'SELECT * FROM orders WHERE cleared = "NO" ORDER BY order_on DESC'
    connection.query(
      sql, (error, results) => {
        res.render('admin/dashboard', {orders: results});
      }
    )
    
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

// create menu
router.get('/create', (req, res) => {
  if (res.locals.isLoggedIn) {
    res.render('admin/create-menu')
  } else {
    res.redirect('/admin/login')
  }
})

router.post('/create', uploads.single('picture'), (req, res) => {
  const menu = {
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    picture: req.file.filename,
    price: req.body.price
  }

  let sql = 'INSERT INTO menu (category, name, description, picture, price) VALUES (?,?,?,?,?)'
  connection.query(
    sql,
    [ 
      menu.category,
      menu.name,
      menu.description,
      menu.picture,
      menu.price
    ],
    (error, results) => {
      res.redirect('/admin/menu')
    }
  )
})

router.get('/menu', (req, res) => {
  if (res.locals.isLoggedIn) {
    let sql = 'SELECT * FROM menu'
    connection.query(
      sql, (error, results) => {
        res.render('admin/menu', {menuItems: results})
      }
    )
  } else {
    res.redirect('/admin/login')
  }
})

// get form to edit menu
router.get('/edit/:id', (req, res) => {
  if (res.locals.isLoggedIn) {
    let sql = 'SELECT * FROM menu WHERE id = ?'
    connection.query(
      sql,
      [ parseInt(req.params.id) ], 
      (error, results) => {
        res.render('admin/edit-menu', {menu: results[0]})
      }
    )
    
  } else {
    res.redirect('/admin/login')
  }
})

// update menu
router.post('/edit/:id', uploads.single('picture'), (req, res) => {
  const menu = {
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    picture: req.body.picture,
    price: req.body.price
  }

  if (req.file) {
    menu.picture = req.file.filename
  }

  let sql = 'UPDATE menu SET category = ?, name = ?, description = ?, picture = ?, price = ? WHERE id = ?'

  connection.query(
    sql,
    [
      menu.category,
      menu.name,
      menu.description,
      menu.picture,
      menu.price,
      parseInt(req.params.id)
    ],
    (error, results) => {
      res.redirect('/admin/menu')
    }
  )

})

// delete a menu item
router.post('/delete/:id', (req, res) => {
  let sql = 'DELETE FROM menu WHERE id = ?'
  connection.query(
    sql,
    [ parseInt(req.params.id) ],
    (error, results) => {
      res.redirect('/admin/menu')
    }
  )
})

// complete order
router.post('/order/:id', (req, res) => {
  let sql = 'UPDATE orders SET cleared = "YES" WHERE id = ?'
  connection.query(
    sql,
    [parseInt(req.params.id)], 
    (error, results) => {
      res.redirect('/admin')
    }
  )
})

// order history
router.get('/order/history', (req, res) => {
  let sql = 'SELECT * FROM orders WHERE cleared = "YES"'
  connection.query(
    sql, 
    (error, results) => {
      res.render('admin/history', {orders: results})
    }
  )
})

module.exports = router;
