import express from 'express'

import Patient from '../models/patient'
import Diagnose from '../models/diagnose'

const router = express.Router()

router.get('/ping', (_req, res) => {
    res.send('pong')
})

router.get('/patients', (_req, res) => {
    res.json(Patient.get())
})

router.get('/diagnoses', (_req, res) => {
    res.json(Diagnose.get())
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
