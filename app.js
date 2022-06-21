const express = require('express');

// Routers
const userRouter = require('./src/routers/user.router')

const app = express()

//For JSON requests
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// Routers
app.use('/api/users', userRouter)

module.exports = app