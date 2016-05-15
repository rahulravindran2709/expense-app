var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send([{name:'food',value:25.00,id:1},{name:'soap',value:25.00,id:2},{name:'electricity',value:15.00,id:3},{name:'water',value:35.00,id:4}]);
});

module.exports = router;
