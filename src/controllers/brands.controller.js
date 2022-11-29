const brandsModel = require('../models/brands.model')
const prodMod = require('../models/products.model')

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

    const existingBrand = await brandsModel.find({name: body.name})
    if(existingBrand.length!==0) {
        return res.status(401).send("Brand already exists")
    }

    const brand = brandsModel.create({
        name: body.name,
        description: body.description,
        status: body.status,
        image:body.image,
    })

    const result = await brand.save()
    req.result = result
    next()
}


async function getAll (req, res, next) {
    const brand = await brandsModel.find()
    req.result = brand
    next()
}

async function getByID (req, res, next) {
    const brand = await brandsModel.findByKey(req.params.id)
    req.result = brand
    next()
}


// async function getByCategory( req, res, next) {
//     const category = req.params.cat

//     const products = await prodMod.find()
//     if(products.length == 0) {
//         req.result = []
//     }

//     let filteredProds =  products.filter(
//         prod => (prod.catName === category)    
//     )
    
//     let brandArray =[]
//     filteredProds.forEach(element => {
//         brandArray.push(element.brandName)
//     })

//     let newBrandArray = [...new Set(brandArray)]

//     let resArray = []

//     newBrandArray.forEach(element => {
//         resArray.push(brandsModel.find({name: req.params.name})[0])
//     })
    

//     req.result = newBrandArray
    
    
    
    
//     next()
// }



async function getByName (req, res, next) {
    const brand = await brandsModel.find({name: req.params.name})
    req.result = brand[0]
    next()
}
async function update (req, res, next) {
    // checkSuper(req)
    // checkActiveAdmin(req)

    let body = req.body
    try {
        const brand = await brandsModel.findByKeyAndUpdate(req.params.id,body)
        req.result = brand
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
    getByName,
    // getByCategory,
    update
}