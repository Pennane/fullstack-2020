export interface Diagnose {
    code: string
    name: string
    latin?: string
}

// Gender does not use a enum type.
// When parsing the gender, it checks through a enum but returns as a string
export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: string
    occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>
