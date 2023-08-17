const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');

const verifyJWT = require('../middleware/verifyJWT')
const cookieParser = require('cookie-parser')

require('dotenv').config();

const port = process.env.PORT || 6006;
const app = express()

app.use(cors())
// middleware for bodyparser
app.use(bodyParser.urlencoded({extended: false}))
// middleware for json (built in to express)
app.use(express.json())
// middleware for using cookies
app.use(cookieParser())

app.use(express.static("artist-angular-frontend"))
// get settings
// const settings = require('./config/settings')

// mongo db url
// const db = settings.mongoDBUrl
const db = process.env.mongoDBUrl

// attempt to connect with DB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.log(err))

// Require routes from route folder
const auth = require("../routes/auth")
const refresh = require('../routes/refresh')
const logout = require('../routes/logout')
const question = require('../routes/api/question')
const event = require('../routes/api/event')
const portfolio = require('../routes/api/portfolio')
const product = require('../routes/api/product')
const about = require("../routes/api/about")

// Middleware for Routes
app.use('/auth', auth)
app.use('/refresh', refresh)
app.use('/logout', logout)
app.use('/api/question', question)
app.use('/event', event)
app.use('/about', about)
app.use('/portfolio', portfolio)
app.use('/api/product', product)

//Now using verifyJWT will cause the server to return Unauthorized, so comment it out temporarily
app.use(verifyJWT) // Will apply to all routes that located down


app.listen(port, () => console.log(`App running at port : ${port}`))