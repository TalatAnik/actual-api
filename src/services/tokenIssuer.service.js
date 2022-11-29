const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()

function generateAccessToken(user) {
    return jwt.sign(
        {
            role:user.role,
            name: user.name,
            key: user.key,
            status:user.status
            
        },
        process.env.SECRET_TOKEN,
        {
            expiresIn:'240h'
        }

    )
}

module.exports = generateAccessToken