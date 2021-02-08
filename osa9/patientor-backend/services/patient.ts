import solidPatients from '../data/patients'
import { PublicPatient, Patient, Entry } from '../types'
import { toNewPatient, toNewEntry, generateId } from '../utils'

let patients: Array<Patient> = solidPatients

const patientToPublic = (patient: Patient): PublicPatient => {
    const { id, name, dateOfBirth, gender, occupation } = patient
    return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }
}

const getPatients = (): Patient[] => {
    return patients
}

const getPublicPatients = (): PublicPatient[] => {
    if (!patients) return []
    return patients.map(patientToPublic)
}

const getPatientById = (id: string): Patient | null => {
    const patient = patients.find((p) => p.id === id)
    if (!patient) return null
    return patient
}

const getPublicPatientById = (id: string): PublicPatient | null => {
    const patient = patients.find((p) => p.id === id)
    if (!patient) return null
    return patientToPublic(patient)
}

const addPatient = (data: any): Patient => {
    const patient = { ...toNewPatient(data), id: generateId() }
    patients = patients.concat(patient)
    return patient
}

const addEntry = (patientId: string, data: any): Entry => {
    const patient = getPatientById(patientId)
    if (!patient) throw new Error(`Patient ${patientId} missing.`)
    const entry: Entry = { ...toNewEntry(data), id: generateId() }
    console.log(patient.entries.length)
    const updatedEntries: Entry[] = patient.entries.concat(entry)
    const updatedPatient: Patient = { ...patient, entries: updatedEntries }
    console.log(updatedPatient.entries.length)
    patients = patients.map((p) => (p.id !== updatedPatient.id ? p : updatedPatient))
    return entry
}

const patientService = {
    getPatients,
    getPublicPatients,
    getPatientById,
    getPublicPatientById,
    addPatient,
    addEntry
}

export default patientService
