
class Util {

    validateArguments(payload, requiredArguments) {
        return requiredArguments.every(requiredArg => {
            return payload[requiredArg] !== undefined && payload[requiredArg] !== null
        })
    }

}

module.exports = Util
