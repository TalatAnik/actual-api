const express = require('express')
const router = express.Router()

const category = require('../controllers/categories.controller')
const tokenAuthenticator = require('../middleware/tokenVerifier.midware')


router
    .get(
        '/',
        category.getAll,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .get(
        '/:id',
        category.getByID,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .post(
        '/',
        // tokenAuthenticator.authorizeToken,
        category.createCategories,
        async (req, res) => {
            res.json(req.result)
        }

    )
    .patch(
        "/:id", 
        // tokenAuthenticator.authorizeToken, 
        category.updateCategory, 
        async (req, res) => {
            return res.json(req.result)
        }
    )


module.exports = router