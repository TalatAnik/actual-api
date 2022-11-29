const {Deta} = require('deta')
const deta = Deta()
const DetaOrm = require('deta-base-orm')
const db = deta.Base('prices')


const priceSchema = new DetaOrm.Schema({
    owner: 'string',
    contractor_price: 'number',
    landlord_price: 'number',
    sme_price: 'number',
    market_price: 'number',
    purchase_price: 'number'

})

const price = new DetaOrm.Base('prices', priceSchema, { db })

module.exports = price