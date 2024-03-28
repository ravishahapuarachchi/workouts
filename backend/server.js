require('dotenv').config()

const express = require('express')
const app = express() //creates express app in 'app'
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')

//middleware

//if any req has a body(aka data to server),
//it passes it & attaches to request object
app.use(express.json())  
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port ', process.env.PORT )
        })  
    })
    .catch((error) => {
        console.log(error)
    })
    




