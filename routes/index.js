var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  req.pool.query('select * from solution', (err, rows) => {
    res.json(rows)
  })
})

/* solution REST */
router.use('/solution/', require('./solution'))

/* testcase REST */
router.use('/testcase/', require('./testcase'))

module.exports = router
