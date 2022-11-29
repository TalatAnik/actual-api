const productModel = require('../models/products.model')

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

async function getAll (req, res, next) {
    const products = await productModel.find()
    req.result = products
    next()
}

async function getByID (req, res, next) {
    let body = req.body
    const product = await productModel.findByKey(req.params.id)
    req.result = product
    next()
}

async function create (req, res, next) {
    // checkSuper(req)
    // checkActiveAdmin(req)

    let body = req.body

    const existingProduct = await productModel.find({name: body.name})
    if(existingProduct.length!==0) {
        return res.status(401).send("product already exists")
    }

    try {
        const product = productModel.create({
            name: body.name,
            description: body.description,
            category: body.category,
            subcategory: body.subcategory,
            brand: body.brand,
            brandName: '',
            catName: '',
            subcatName: '',
            unit: body.unit,
            min_unit: body.min_unit,
            availability:body.availability,
            status:body.status, 
            image:body.image,   
        })
    
        req.result = await product.save()
    } catch(err) {
        req.result = err
    }
    
    next()
}

async function update (req, res, next) {
    // checkSuper(req)
    // checkActiveAdmin(req)

    let body = req.body
    try {
        const category = await productModel.findByKeyAndUpdate(req.params.id,req.body)
        req.result = category
    } catch (err) {
        console.log(err)
        return res.status(404).send(err)
    } 
    
    next()
}

module.exports = {
    getAll,
    getByID,
    create,
    update
}