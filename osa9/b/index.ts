import express from 'express'
const app = express()

import calulateBmi from './bmiCalculator'
import calculateExcercises from './exerciseCalculator'

app.get('/hello', (_req, res) => {
    res.send('Hello full stack!')
})

app.get('/bmi', (req, res) => {
    if (!req.query.weight || !req.query.height) return res.status(400).send('Missing parameters')

    const weight = Number(req.query.weight)
    const height = Number(req.query.height)

    const BMI = calulateBmi(height, weight)

    if (BMI === null) return res.status(400).send('Malformatted parameters')

    return res.json({
        weight: weight,
        height: height,
        bmi: BMI
    })
})

app.get('/exercises', (req, res) => {
    if (!req.query.daily_exercises || !req.query.target) return res.status(400).send('Missing parameters')
    const exercises: Array<number> = JSON.parse(String(req.query.daily_exercises))
    const target = Number(req.query.target)
    const exercisesResult = calculateExcercises(exercises, target)
    return res.json(exercisesResult)
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
