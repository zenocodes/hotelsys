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

// make order
router.post('/order', (req, res, next) => {
  const order = {
    items: req.body.items.split(','),
    amount: parseInt(req.body.amount)
  }
  let sql = 'INSERT INTO orders (items, amount) VALUES (JSON_ARRAY(?),?)'
  connection.query(
    sql, 
    [
      [...order.items],
      order.amount
    ], 
    (error, results) => {
      res.redirect('/')
    }
  )
})



module.exports = router;
