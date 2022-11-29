const {Deta} = require('deta')
const deta = Deta('c04auncb_5sTHrLUu9MjrcGGkWHgKNLMCPccf18jW')
const DetaOrm = require('deta-base-orm')
const db = deta.Base('users')

const userSchema = new DetaOrm.Schema({
    name: 'string',
    password: 'string',
    role: 'string',
    type: 'string',
    status: 'boolean',
    balance: 'number',
    email: 'string',
    phone: 'string',
    address: 'string',
    nid: 'string',
    tin: 'string',
    trade_licence: 'string',
    organization: 'string',
    created: 'string'
    
})

const User = new DetaOrm.Base('users', userSchema, { db })

module.exports = User