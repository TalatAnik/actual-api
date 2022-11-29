const express = require('express')
const router = express.Router()

const price = require('../controllers/prices.controller')
const tokenAuthenticator = require('../middleware/tokenVerifier.midware')



router
    .get(
        '/',
        // tokenAuthenticator.authorizeToken,
        price.getAll,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .get(
        '/prod/:id',
        // tokenAuthenticator.authorizeToken,
        price.getByProduct,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .get(
        '/:id',
        // tokenAuthenticator.authorizeToken,
        price.getByID,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .post(
        '/',
        // tokenAuthenticator.authorizeToken,
        price.create,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .patch(
        '/:id',
        // tokenAuthenticator.authorizeToken,
        price.update,
        async (req, res) => {
            res.json(req.result)
        }
    )



module.exports = router