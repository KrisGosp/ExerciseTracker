require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')

const app = express();

//middleware
app.use(express.json())

//routes
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.DB_STRING)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port ' + process.env.PORT);
        })
    })
    .catch(err => console.log(err));