var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard', {title: 'Dashboard'});
});

// users' login page
router.get('/login', (req, res, next) => {
  res.render('admin/login', {title: 'Login'})
})


module.exports = router;
