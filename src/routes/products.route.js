const express = require('express')
const router = express.Router()

const product = require('../controllers/products.controller')
const tokenAuthenticator = require('../middleware/tokenVerifier.midware')

router  
    .get(
        '/',
        product.getAll,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .get(
        '/:id',
        // tokenAuthenticator.authorizeToken,
        product.getByID,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .post(
        '/',
        // tokenAuthenticator.authorizeToken,
        product.create,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .patch(
        '/:id',
        // tokenAuthenticator.authorizeToken,
        product.update,
        async (req, res) => {
            res.json(req.result)
        }
    )



module.exports = router