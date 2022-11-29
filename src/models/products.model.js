const {Deta} = require('deta')
const deta = Deta('c04auncb_5sTHrLUu9MjrcGGkWHgKNLMCPccf18jW')
const DetaOrm = require('deta-base-orm')
const db = deta.Base('products')

const price = require('./prices.model')

const productSchema = new DetaOrm.Schema({
    name: 'string',
    description: 'string',
    category: 'string',
    subcategory: 'string',
    brand: 'string',
    brandName: 'string',
    catName: 'string',
    subcatName: 'string',
    unit: 'string',
    availability: 'boolean',
    min_unit: 'number',
    status: 'boolean',
    image:'string'
})


const product = new DetaOrm.Base('products', productSchema, { db })

module.exports = product