const categoryModel = require('../models/categories.model')

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

async function createCategories (req, res, next) {
    // checkSuper(req)
    // checkActiveAdmin(req)

    let body = req.body

    const existingCat = await categoryModel.find({name: body.name})
    if(existingCat.length!==0) {
        return res.status(401).send("Category already exists")
    }

    const category = categoryModel.create({
        name: body.name,
        description: body.description
    })

    const result = await category.save()
    req.result = result
    next()
}


async function getAll (req, res, next) {
    const categories = await categoryModel.find()
    req.result = categories
    next()
}

async function getByID (req, res, next) {
    let body = req.body
    const category = await categoryModel.findByKey(req.params.id)
    req.result = category
    next()
}

async function updateCategory (req, res, next) {
    // checkSuper(req)
    // checkActiveAdmin(req)

    let body = req.body
    try {
        const category = await categoryModel.findByKeyAndUpdate(req.params.id,req.body)
        req.result = category
    } catch (err) {
        console.log(err)
        return res.status(404).send(err)
    } 
    
    next()
}

module.exports = {
    createCategories,
    getAll,
    getByID,
    updateCategory
}