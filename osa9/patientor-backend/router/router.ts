import express from 'express'

import Patient from '../models/patient'
import Diagnose from '../models/diagnose'

const router = express.Router()

router.get('/ping', (_req, res) => {
    res.send('pong')
})

router.get('/patients', (_req, res) => {
    res.json(Patient.getAll())
})

router.get('/diagnoses', (_req, res) => {
    res.json(Diagnose.getAll())
})

router.get('/patients/:id', (req, res) => {
    const patient = Patient.getById(req.params.id)
    if (!patient) return res.status(404).send('No user found for that id')
    return res.json(patient)
})

router.post('/patients', (req, res) => {
    try {
        const patient = Patient.add(req.body)
        res.json(patient)
    } catch (exception) {
        res.status(400).send(exception.message)
    }
})

export default router
