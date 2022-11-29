const orderModel = require('../models/orders.model')


// functions to check if authenticated and authorized

// function checkActiveAdmin(req) {
//     if (req.status == true && req.role !== 'user') {
//         return
//     }
//     return res.status(401).send('Not authorized for this action')
// }

// function checkSuper(req) {
//     if (req.role == 'super') {
//         return
//     }
//     return res.status(401).send('Not authorized for this action')
// }



//actual controller functions to get data

async function create (req, res, next) {
    // checkSuper(req)
    // checkActiveAdmin(req)

    let body = req.body

    const order = orderModel.create({
        customer: body.customer,
        owner_id:body.owner_id,
        description: body.description,
        order_date: body.order_date,
        delivery_date: body.delivery_date,
        order_address: body.order_address,
        status: false,
        total: body.total
    })

    const result = await order.save()
    req.result = result
    next()
}


async function getAll (req, res, next) {
    const order = await orderModel.find()
    req.result = order
    next()
}

async function getByID (req, res, next) {
    const order = await orderModel.findByKey(req.params.id)
    req.result = order
    next()
}

async function update (req, res, next) {
    // checkSuper(req)
    // checkActiveAdmin(req)

    let body = req.body
    try {
        const order = await orderModel.findByKeyAndUpdate(req.params.id,body)
        req.result = order
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