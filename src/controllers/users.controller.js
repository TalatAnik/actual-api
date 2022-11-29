const userModel = require('../models/users.model')
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


//actual controller functions 

async function login (req, res, next) {
    
    const body = req.body
    if(!body.phone || !body.password) {
        return res.status(400).send('missing parameters')
    }

    try {
        const phone = body.phone
		const password = body.password

        const results = await userModel.find({phone: phone})
        let user = results[0]

        if(!user) {
            return res.status(404).send('user not found')
        }

        if (user.password !== password) {
            return res.status(403).send('bad password')
        }

        let token = jwtService(user)
        req.token = token
        delete user.password
        req.user = user
        next()

    } catch (err) {
        console.log(err)
        res.status(401).send('login unsuccessful')
    }
}


async function create (req, res, next) {

    // if(!checkSuper(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }

    let body = req.body

    const existingUser = await userModel.find({email: body.email})
    if(existingUser.length!==0) {
        return res.status(401).send("User email already exists")
    }

    if(body.type == "landlord") {
        const user = await userModel.create({
            name: body.name,
            phone: body.phone,
            email: body.email,
            password: body.password,
            type: "landlord",
            role: "user",
            status: false,
            balance: 0,
            address: body.address,
            nid: body.nid ,
            created: body.created  
        })

        req.result = await user.save()
        next()

    } else if(body.type == "contractor") {
        const user = await userModel.create({
            name: body.name,
            phone: body.phone,
            email: body.email,
            password: body.password,
            type: "contractor",
            role: "user",
            status: false,
            balance: 0,
            address: body.address,
            nid: body.nid,
            created: body.created
        })

        req.result = await user.save()
        next()
        
    }else if (body.type == "sme") {
        const user = await userModel.create({
            name: body.name,
            manager:body.manager,
            phone: body.phone,
            email: body.email,
            password: body.password,
            type: "sme",
            role: "user",
            status: false,
            balance: 0,
            address: body.address,
            tin: body.tin,
            trade_licence: body.tradeLicence,
            organization: body.organization,
            created: body.created
        })

        req.result = await user.save()
        next()
        
    }else {
        res.status(401).send("error processing signup")
    }

}

async function getAll (req,res,next) {
    // if (!checkActiveAdmin(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }

    req.result = await userModel.find()
    next()

}

async function getMyDetails (req, res, next) {
    if(req.decoded !== null) {
        req.result = req.decoded
        
    } else {
        req.result = {message:"details not found"}
    }

    next()
    
}

async function getUserByID(req, res, next) {
    // if (!checkActiveAdmin(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }

    req.result = await userModel.findByKey(req.params.id)
    next()

}

async function updateUserByID(req, res, next) {
    // if(!checkSuper(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }

    let body = req.body
    try {
        req.result = await userModel.findByKeyAndUpdate(req.params.id,req.body)
    } catch (err) {
        console.log (err)
        return res.status(400).send(err)
    }
    
    next()
}

module.exports = {
    create,
    login,
    getAll,
    getUserByID, 
    getMyDetails,
    updateUserByID
}