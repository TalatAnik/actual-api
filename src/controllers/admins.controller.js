const adminModel = require('../models/admins.model')
const jwtService = require('../services/tokenIssuer.service')


// functions to check if authenticated and authorized

function checkActiveAdmin(req) {
    if (req.status == true && req.role !== 'user') {
        return true
    }
    return false
}

function checkSuper(req) {
    if (req.role == 'super') {
        return true
    }
    return false
}


//actual controller functions to get data

async function login (req, res, next) {
    
    const body = req.body
    if(!body.name || !body.password) {
        return res.status(400).send('missing parameters')
    }

    try {
        const name = body.name
		const password = body.password

        const results = await adminModel.find({name: name})
        let admin = results[0]

        if(!admin) {
            return res.status(404).send('user not found')
        }

        if (admin.password !== password) {
            return res.status(403).send('bad password')
        }

        req.result = jwtService(admin)
        next()

    } catch (err) {
        res.status(401).send(err + "funny error!")
    }
}

async function createAdmin (req, res, next) {

    // if(!checkSuper(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }

    let body = req.body

    const existingAdmin = await adminModel.find({name: body.name})
    if(existingAdmin.length!==0) {
        return res.status(401).send("Admin already exists")
    }

    const admin = await adminModel.create({
        name: body.name,
        password: body.password,
        role: body.role,
        status: body.status
    })

    const result = await admin.save()
    req.result = result
    next()

}

async function getAllAdmins (req,res,next) {
    if (!checkActiveAdmin(req)) {
        return res.status(401).send('Not authorized for this action')
    }

    const allAdmins = await adminModel.find()
    req.result = allAdmins
    next()

}

async function getAdminByID(req, res, next) {
    // if (!checkActiveAdmin(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }

    const admin = await adminModel.findByKey(req.params.id)
    req.result = admin
    next()

}

async function updateAdminByID(req, res, next) {
    // if(!checkSuper(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }

    let body = req.body
    try {
        const admin = await adminModel.findByKeyAndUpdate(req.params.id,req.body)
        req.result = admin
    } catch (err) {
        console.log (err)
        return res.status(400).send(err)
    }
    
    next()
}

module.exports = {
    login,
    createAdmin,
    getAllAdmins,
    getAdminByID,
    updateAdminByID
}