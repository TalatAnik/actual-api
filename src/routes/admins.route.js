const express = require('express')
const router = express.Router()

const admin = require('../controllers/admins.controller')
const tokenAuthenticator = require('../middleware/tokenVerifier.midware')

router
    .post(
        "/login", 
        admin.login, 
        async (req, res) => {
            return res.json({token:req.result})
        }
    )
    .get(
        "/", 
        tokenAuthenticator.authorizeToken, 
        admin.getAllAdmins, 
        async (req, res) => {
            return res.json(req.result)
        }
    ).get(
        '/:id', 
        // tokenAuthenticator.authorizeToken, 
        admin.getAdminByID, 
        async (req, res) => {
            return res.json(req.result)
        }
    )
    .post(
        "/", 
        // tokenAuthenticator.authorizeToken, 
        admin.createAdmin, 
        async (req, res) => {
            return res.json(req.result)
        }
    )
    .patch(
        "/:id", 
        // tokenAuthenticator.authorizeToken, 
        admin.updateAdminByID, 
        async (req, res) => {
            return res.json(req.result)
        }
    )


module.exports = router