const subcategoryModel = require('../models/subcategories.model')

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

    const existingSubcat = await subcategoryModel.find({name: body.name})
    if(existingSubcat.length!==0) {
        return res.status(401).send("Subcategory already exists")
    }

    const subcategory = subcategoryModel.create({
        name: body.name,
        description: body.description,
        parent: body.parent
    })

    const result = await subcategory.save()
    req.result = result
    next()
}

async function getByID (req, res, next) {
    const subcategory = await subcategoryModel.findByKey(req.params.id)
    req.result = subcategory
    next()
}

async function getAll (req, res, next) {
    const subcategories = await subcategoryModel.find()
    req.result = subcategories
    next()
}

async function update (req, res, next) {
    checkSuper(req)
    checkActiveAdmin(req)

    let body = req.body
    try {
        const subcategory = await subcategoryModel.findByKeyAndUpdate(req.params.id,req.body)
        req.result = subcategory
    } catch (err) {
        console.log(err)
        return res.status(404).send(err)
    } 
    
    next()
}

module.exports = {
    create,
    getAll,
    getByID,
    update
}