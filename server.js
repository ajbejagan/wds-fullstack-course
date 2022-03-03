if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000

// import index router
const indexRouter = require('./routes/index')

// set ejs as view engine
app.set('view engine', 'ejs')
// set where 'views' are coming from
app.set('views', __dirname + '/views')
// set up a layout file - ever single file will live inside this layout file
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
// set where assets/static files are located - images, styles, js
app.use(express.static('public'))

const mongoose = require('mongoose')
// use mongoose to connect to the mongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log('Connected to mongoose'))

// tell express to use indexRouter in handling the '/' route
app.use('/', indexRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))