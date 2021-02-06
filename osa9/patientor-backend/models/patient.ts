import solidPatients from '../data/patients.json'
import { NonSensitivePatient, Patient } from '../types/types'
import { toNewPatient } from '../utils/utils'

let patients: Array<Patient> = solidPatients.map((patient) => toNewPatient(patient))

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    if (!patients) return []
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }
    })
}

const add = (data: any) => {
    const patient = toNewPatient(data)
    patients = patients.concat(patient)
    return patient
}

const Patient = {
    get: getNonSensitivePatients,
    add
}

export default Patient
