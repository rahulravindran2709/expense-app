var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send([{name:'food',value:25.00},{name:'soap',value:25.00},{name:'electricity',value:15.00},{name:'water',value:35.00}]);
});

module.exports = router;
