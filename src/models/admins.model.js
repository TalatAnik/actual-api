const {Deta} = require('deta')
const deta = Deta('c04auncb_5sTHrLUu9MjrcGGkWHgKNLMCPccf18jW')
const DetaOrm = require('deta-base-orm')
const db = deta.Base('admins')

const AdminSchema = new DetaOrm.Schema({
    name: 'string',
    password: 'string',
    role: 'string',
    status: 'boolean'
})

const Admin = new DetaOrm.Base('admins', AdminSchema, { db })

module.exports = Admin