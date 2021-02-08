import express from 'express'

import { Patient, Entry, PublicPatient, Diagnose } from '../types'
import patientService from '../services/patient'
import diagnoseService from '../services/diagnose'

const router = express.Router()

router.get('/ping', (_req, res) => {
    res.send('pong')
})

router.get('/patients', (_req, res) => {
    const patients: PublicPatient[] = patientService.getPublicPatients()
    res.json(patients)
})

router.get('/diagnoses', (_req, res) => {
    const diagnoses: Diagnose[] = diagnoseService.getAll()
    res.json(diagnoses)
})

router.get('/patients/:id', (req, res) => {
    const patient: Patient | null = patientService.getPatientById(req.params.id)
    if (!patient) return res.status(404).send('No user found for that id')
    return res.json(patient)
})

router.post('/patients', (req, res) => {
    try {
        const patient: Patient = patientService.addPatient(req.body)
        res.json(patient)
    } catch (exception) {
        res.status(400).send(exception.message)
    }
})

router.post('/patients/:patientId/entries', (req, res) => {
    try {
        const entry: Entry = patientService.addEntry(req.params.patientId, req.body)
        res.json(entry)
    } catch (exception) {
        res.status(400).send(exception.message)
    }
})

export default router
