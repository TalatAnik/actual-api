const express = require('express')
const router = express.Router()

const subcategory = require('../controllers/subcategories.controller')
const tokenAuthenticator = require('../middleware/tokenVerifier.midware')

router
    .get(
        '/',
        subcategory.getAll,
        async (req,res) => {
            res.json(req.result)
        }
    )
    .get(
        '/:id',
        subcategory.getByID,
        async (req,res) => {
            res.json(req.result)
        }
    )
    .post(
        '/',
        // tokenAuthenticator.authorizeToken,
        subcategory.create,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .patch(
        '/:id',
        tokenAuthenticator.authorizeToken,
        subcategory.update,
        async (req, res) => {
            res.json(req.result)
        }
    )


module.exports = router