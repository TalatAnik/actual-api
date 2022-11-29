const transactionModel = require('../models/transactions.model')
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

async function create (req, res, next) {
    // if(!checkSuper(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }
    try {
        let body = req.body
    
        const transaction = await transactionModel.create({
            subject: body.subject,
            sub_id: body.key,
            role: body.role,
            action: body.action,
            object: body.object,
            obj_key: body.objKey,
            amount: body.amount,
            details: body.details,
            status: false,
            time:body.time
        })

        req.result = await transaction.save()
        next()
    } catch (err) {
        res.status(401).send(err)
    }
    
}

async function getAll (req, res, next) {
    // if(!checkSuper(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }

    req.result = await transactionModel.find()
    next()

}

async function getByID (req, res, next) {
    // if(!checkSuper(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }

    req.result = await transactionModel.findByKey(req.params.id)
    next()

}

async function update (req, res, next) {
    // if(!checkSuper(req)) {
    //     return res.status(401).send('Not authorized for this action')
    // }

    req.result = await transactionModel.findByKeyAndUpdate(req.params.id, req.body)
    next()
}

module.exports = {
    create,
    getAll,
    getByID,
    update
}