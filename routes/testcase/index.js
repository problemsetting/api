var express = require('express')
var router = express.Router()

async function postTestCase(req, res) {
    const payload = req.body
    const Util = req.container.get('libs.util')

    if(!Util.validateArguments(payload, [
        'input',
        'output'
    ])) {
        return res.json({
            error: 'Missing required params.'
        })
    }

    const insertResult = await req.pool.query(
        'insert into test_case set ?',
        {
            input: payload.input,
            output: payload.output
        }
    )

    return res.json({
        id: insertResult.insertId
    })
}

router.post('/', postTestCase)

module.exports = router
