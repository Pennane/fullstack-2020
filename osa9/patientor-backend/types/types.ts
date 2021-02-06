export interface Diagnose {
    code: string
    name: string
    latin?: string
}

export interface Entry {}

// Gender does not use a enum type.
// When parsing the gender, it checks through a enum but returns gender as a string
export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: string
    occupation: string
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>
