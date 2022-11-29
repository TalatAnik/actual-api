const express = require('express')
const req = require('express/lib/request')
const router = express.Router()

const user = require('../controllers/users.controller')
const tokenAuthenticator = require('../middleware/tokenVerifier.midware')

router
    .post(
        "/login", 
        user.login, 
        async (req, res) => {
            return res.json({token:req.token, user: req.user})
        }
    )
    .get(
        "/", 
        //tokenAuthenticator.authorizeToken, 
        user.getAll, 
        async (req, res) => {
            return res.json(req.result)
        }
     )
     .get(
         "/details/",
         // tokenAuthenticator.verifyToken(req.body.token),
         user.getMyDetails,
         async(req, res) => {
             return res.json(req.result)
         }
     )
    .get(
        '/:id', 
        //tokenAuthenticator.authorizeToken, 
        user.getUserByID, 
        async (req, res) => {
            return res.json(req.result)
        }
    )
    .post(
        "/", 
        user.create, 
        async (req, res) => {
            return res.json(req.result)
        }
    )
    .patch(
        "/:id", 
        //tokenAuthenticator.authorizeToken, 
        user.updateUserByID, 
        async (req, res) => {
            return res.json(req.result)
        }
    )


module.exports = router