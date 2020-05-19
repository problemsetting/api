const nodeDependencyInjection = require('node-dependency-injection')

const container = new nodeDependencyInjection.ContainerBuilder()

container.register('libs.util', require('../libs/util'))

function appendContainer(req, res, next) {
    req.container = container
    next()
}

module.exports = appendContainer
