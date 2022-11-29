// install express with `npm install express` 
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
const upload = require("express-fileupload")
const express = require('express')
const bodyparser = require('body-parser')


const adminsRoute = require('./src/routes/admins.route')
const categoryRoute = require('./src/routes/categories.route')
const subcategoryRoute = require('./src/routes/subcategories.route')
const productsRoute = require('./src/routes/products.route')
const pricesRoute = require('./src/routes/prices.route')
const userRoute = require('./src/routes/users.route')
const transactionRoute = require('./src/routes/transactions.route')
const brandsRoute = require('./src/routes/brands.route')
const orderRoute = require('./src/routes/orders.route')
const imgRoute = require('./src/routes/images.route')

const errorHandler = require('./src/middleware/errorHandler.midware')

const app = express()
app.use(express.json())

app.use(helmet())
app.use(bodyparser.json())
app.use(upload())

app.use(cors({origin: '*'}))

//All routes under here
app.use("/admins", adminsRoute)
app.use("/category", categoryRoute)
app.use("/subcategory", subcategoryRoute)
app.use("/products", productsRoute)
app.use("/prices", pricesRoute)
app.use("/users", userRoute)
app.use("/transactions", transactionRoute)
app.use("/brands", brandsRoute)
app.use("/orders", orderRoute)
app.use("/img", imgRoute)


// 404 route handler, must be after all defined routes and route groups
app.use(errorHandler)

//not needed when finally depoloyed
// port = process.env.PORT || 8000
// app.listen(port, () => {
//   console.log(`listening on port ${port}`)
// })

// export 'app'
module.exports = app