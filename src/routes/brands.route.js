const express = require('express')
const router = express.Router()

const brand = require('../controllers/brands.controller')
const tokenAuthenticator = require('../middleware/tokenVerifier.midware')


router    
    .get(
        '/',
        brand.getAll,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .get(
        '/:id',
        brand.getByID,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .get(
        '/name/:name',
        brand.getByName,
        async (req, res) => {
            res.json(req.result)
        }
    )
    // .get(
    //     '/category/:cat',
    //     brand.getByCategory,
    //     async (req, res) => {
    //         res.json(req.result)
    //     }
    // )
    .post(
        '/',
        // tokenAuthenticator.authorizeToken,
        brand.create,
        async (req, res) => {
            res.json(req.result)
        }

    )
    .patch(
        "/:id", 
        // tokenAuthenticator.authorizeToken, 
        brand.update, 
        async (req, res) => {
            return res.json(req.result)
        }
    )


module.exports = router