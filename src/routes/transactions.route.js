const express = require('express')
const router = express.Router()

const transaction = require('../controllers/transactions.controller')
const tokenAuthenticator = require('../middleware/tokenVerifier.midware')


router
    .get(
        '/',
        transaction.getAll,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .get(
        '/:id',
        transaction.getByID,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .post(
        '/',
        // tokenAuthenticator.authorizeToken,
        transaction.create,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .patch(
        "/:id", 
        //tokenAuthenticator.authorizeToken, 
        transaction.update, 
        async (req, res) => {
            return res.json(req.result)
        }
    )


module.exports = router