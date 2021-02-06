import solidPatients from '../data/patients.json'
import { NonSensitivePatient, Patient } from '../types'
import { toNewPatient } from '../utils'

let patients: Array<Patient>
try {
    console.log('haha yes')
    patients = solidPatients.map((patient) => toNewPatient(patient))
} catch (e) {
    console.log(e)
}

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
