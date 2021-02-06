import solidPatients from '../data/patients.json'
import { PublicPatient, Patient } from '../types/types'
import { toNewPatient } from '../utils/utils'

let patients: Array<Patient> = solidPatients.map((patient) => toNewPatient(patient))

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

const getPublicPatients = (): PublicPatient[] => {
    if (!patients) return []
    return patients.map((patient) => patientToPublic(patient))
}

const findById = (id: string): PublicPatient | null => {
    const patient = patients.find((p) => p.id === id)
    if (!patient) return null
    return patientToPublic(patient)
}

const add = (data: any) => {
    const patient = toNewPatient(data)
    patients = patients.concat(patient)
    return patient
}

const Patient = {
    getAll: getPublicPatients,
    getById: findById,
    add
}

export default Patient
