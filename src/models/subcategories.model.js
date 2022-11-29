const {Deta} = require('deta')
const deta = Deta('c04auncb_5sTHrLUu9MjrcGGkWHgKNLMCPccf18jW')
const DetaOrm = require('deta-base-orm')
const db = deta.Base('subcategories')

const subcategorySchema = new DetaOrm.Schema({
    name: 'string',
    description: 'string',
    parent: 'string'
    
})

const Subcategory = new DetaOrm.Base('subcategories', subcategorySchema, { db })

module.exports = Subcategory