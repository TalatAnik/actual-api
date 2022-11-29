const {Deta} = require('deta')
const deta = Deta('c04auncb_5sTHrLUu9MjrcGGkWHgKNLMCPccf18jW')
const DetaOrm = require('deta-base-orm')
const db = deta.Base('transactions')


const transactionSchema = new DetaOrm.Schema({
    subject: 'string',
    sub_key: 'string',
    role: 'string',
    action: 'string',
    object: 'string',
    obj_key: 'string',
    amount: 'number',
    details: 'string',
    time: 'string',
    status: 'boolean'

})

const transaction = new DetaOrm.Base('transactions', transactionSchema, { db })

module.exports = transaction