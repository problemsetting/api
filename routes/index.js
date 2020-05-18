var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.pool.query('select * from solution', (err, rows) => {
    res.json(rows);
  });
});

module.exports = router;
