var express = require('express');
var router = express.Router();
var connection = require('../db-config')

/* GET home page. */
router.get('/', function(req, res, next) {
  let sql = 'SELECT * FROM menu'
  connection.query(
    sql, (error, results) => {
      res.render('index', { menuItems: results });
    }
  )
});

// login page
router.get('/login', (req, res, next) => {
  res.send('login page from index routes')
})



module.exports = router;
