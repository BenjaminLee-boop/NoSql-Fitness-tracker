const router = require('express').Router();
const path = require('path');
const { Workout } = require('../models/index')

router.get('/', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/exercise', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/exercise.html'))
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/stats', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/stats.html'))
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $limit: 1
        },
        {
            $sort: { day: -1 }
        },
        {
            $addFields: { 
                totalDuration: { $sum: "$exercises.duration" }
            },
        }
    ]).then(latest => {
            console.log(latest)
            res.json(latest)
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
        .then(workout => {
            res.json(workout)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.put('/api/workouts/:id', (req, res) => {
    Workout.findById(req.params.id)
        .then(workout => {
            workout.exercises.push(req.body)
            Workout.updateOne({ _id: req.params.id }, workout, (err, result) => {
                res.json(workout)
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.get('/api/workouts/range', (req, res) => {
    Workout
        .find({})
        .sort({ _id: -1 })
        .limit(7)
        .then(range => {
            res.json(range)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

module.exports = router;