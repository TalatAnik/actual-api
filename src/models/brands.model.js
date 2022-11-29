const {Deta} = require('deta')
const deta = Deta('c04auncb_5sTHrLUu9MjrcGGkWHgKNLMCPccf18jW')
const DetaOrm = require('deta-base-orm')
const db = deta.Base('brands')

const BrandSchema = new DetaOrm.Schema({
    name: 'string',
    description:'string',
    image: 'string',
    status: 'boolean'
})

const Brand = new DetaOrm.Base('brands', BrandSchema, { db })

module.exports = Brand