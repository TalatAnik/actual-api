const priceModel = require('../models/prices.model')

// functions to check if authenticated and authorized

function checkActiveAdmin(req) {
    if (req.status == true && req.role !== 'user') {
        return
    }
    return res.status(401).send('Not authorized for this action')
}

function checkSuper(req) {
    if (req.role == 'super') {
        return
    }
    return res.status(401).send('Not authorized for this action')
}


//actual controller functions to get data

async function create (req, res, next) {
    // checkSuper(req)
    // checkActiveAdmin(req)

    let body = req.body

    const existingPrice = await priceModel.find({owner: body.owner})
    if(existingPrice.length!==0) {
        return res.status(401).send("price already exists")
    }

    try {
        const price = priceModel.create({
            owner: body.owner,
            contractor_price: body.contractor_price,
            landlord_price: body.landlord_price,
            sme_price: body.sme_price,
            market_price: body.market_price,
            purchase_price: body.purchase_price   
        })
    
        req.result = await price.save()
    } catch(err) {
        req.result = err
    }
    
    next()
}

async function getByProduct (req, res, next) {
    req.result = await priceModel.find({owner: req.params.id})
    req.result = req.result[0]

    next()
}

async function getByID (req, res, next) {
    let body = req.body
    req.result = await priceModel.findByKey(req.params.id)

    next()
}

async function getAll (req, res, next) {
    
    const allPrices = await priceModel.find()
    req.result = allPrices
    next()
}

async function update (req, res, next) {
    // checkSuper(req)
    // checkActiveAdmin(req)

    let body = req.body
    try {
        req.result = await priceModel.findByKeyAndUpdate(req.params.id,req.body)
    } catch (err) {
        console.log(err)
        return res.status(404).send(err)
    } 
    
    next()
}

module.exports = {
    getByProduct,
    getAll,
    getByID,
    create,
    update
}