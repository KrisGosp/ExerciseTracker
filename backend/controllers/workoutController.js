const Workout = require('../models/Workout');
const mongoose = require('mongoose');
const { request } = require('express');

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json(workout);
}

// create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    // add DOC to DB
    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { title, reps, load } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout  = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

    res.status(200).json(workout);
};


// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }
    
    res.status(200).json(workout);
};

module. exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}