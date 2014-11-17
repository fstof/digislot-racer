var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/some', function(req, res) {
  res.render('something', { title: 'BOO' });
});

module.exports = router;
