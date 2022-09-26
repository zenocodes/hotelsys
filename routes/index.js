var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// login page
router.get('/login', (req, res, next) => {
  res.send('login page from index routes')
})



module.exports = router;
