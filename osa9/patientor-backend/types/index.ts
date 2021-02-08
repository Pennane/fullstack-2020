/*https://stackoverflow.com/questions/57103834/typescript-omit-a-property-from-all-interfaces-in-a-union-but-keep-the-union-s*/
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
}

export interface Diagnose {
    code: string
    name: string
    latin?: string
}

export interface EntryDischarge {
    date: string
    criteria: string
}

export interface OccupationalSickLeave {
    startDate: string
    endDate: string
}

export interface BaseEntry {
    type: string
    id: string
    date: string
    specialist: string
    description: string
}

export interface DiagnoseEntry extends BaseEntry {
    diagnosisCodes?: string[]
}

export interface HospitalEntry extends DiagnoseEntry {
    type: 'Hospital'
    discharge?: EntryDischarge
}

export interface OccupationalHealthCareEntry extends DiagnoseEntry {
    type: 'OccupationalHealthcare'
    employerName: string
    sickLeave?: OccupationalSickLeave
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck'
    healthCheckRating: HealthCheckRating
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry

export type NewEntry = DistributiveOmit<Entry, 'id'>

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
    entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id'>

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>
