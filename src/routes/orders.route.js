const express = require('express')
const router = express.Router()

const order = require('../controllers/orders.controller')
const tokenAuthenticator = require('../middleware/tokenVerifier.midware')


router    
    .get(
        '/',
        order.getAll,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .get(
        '/:id',
        order.getByID,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .post(
        '/',
        // tokenAuthenticator.authorizeToken,
        order.create,
        async (req, res) => {
            res.json(req.result)
        }

    )
    .patch(
        "/:id", 
        // tokenAuthenticator.authorizeToken, 
        order.update, 
        async (req, res) => {
            return res.json(req.result)
        }
    )


module.exports = router