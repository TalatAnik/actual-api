const {Deta} = require('deta')
const deta = Deta('c04auncb_5sTHrLUu9MjrcGGkWHgKNLMCPccf18jW')
const DetaOrm = require('deta-base-orm')
const db = deta.Base('categories')


const CategorySchema = new DetaOrm.Schema({
    name: 'string',
    description: 'string',
    
})

const Category = new DetaOrm.Base('categories', CategorySchema, { db })

module.exports = Category