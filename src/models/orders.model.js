const {Deta} = require('deta')
const deta = Deta('c04auncb_5sTHrLUu9MjrcGGkWHgKNLMCPccf18jW')
const DetaOrm = require('deta-base-orm')
const db = deta.Base('orders')

const OrderSchema = new DetaOrm.Schema({
    customer: 'string',
    owner_id: 'string',
    description:'string',
    order_date: 'string',
    delivery_date: 'string',
    order_address: 'string',
    total: 'number',
    status: 'boolean'
})

const Order = new DetaOrm.Base('orders', OrderSchema, { db })

module.exports = Order