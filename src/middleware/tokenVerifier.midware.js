const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const req = require('express/lib/request')

dotenv.config()

function parseToken(token) {    
    if (token) {
        try {
            return jwt.verify(token, process.env.SECRET_TOKEN)
        } catch (err) {
            if (this.enforceSecurityChecks) {
                throw new UserError('Invalid token')
            } else {
                return null
            }
        }
    }
    return null
}

function verifyToken(token) {    
    if (token) {
        try {
            req.decoded = jwt.verify(token, process.env.SECRET_TOKEN)
            return
        } catch (err) {
            if (this.enforceSecurityChecks) {
                req.decoded = null
                throw new UserError('Invalid token')
            } else {
                req.decoded = null
                return null
            }
        }
    }
    req.decoded = null
    next()
}

async function authorizeToken(req, res, next) {
    if(!req.headers['authorization']) 
        return res.send("Unauthorized request")
    try {
        
        let bearerHeader = req.headers['authorization']
        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]

            const tokenDetails = parseToken(bearerToken)

            if(!tokenDetails) {
                return res.status(401).send("Invalid Token")
            }

            req.role = tokenDetails.role
            req.id = tokenDetails.key
            req.status = tokenDetails.status

            next()
        
        }
    }
    catch (err) {
        return res.status(401).send("Authorization error")
    }

}

module.exports = {authorizeToken, verifyToken}