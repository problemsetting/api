var express = require('express')
var router = express.Router()

async function postSolution(req, res) {
    const payload = req.body
    const Util = req.container.get('libs.util')

    if(!Util.validateArguments(payload, [
        'source_code',
        'language'
    ])) {
        return res.json({
            error: 'Missing required params.'
        })
    }

    const insertResult = await req.pool.query(
        'insert into solution set ?',
        {
            source_code: payload.source_code,
            language: payload.language
        }
    )

    return res.json({
        id: insertResult.insertId
    })
}

router.post('/', postSolution)

module.exports = router
