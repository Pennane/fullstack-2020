import { Patient } from '../types/types'

enum Gender {
    'male',
    'female',
    'other'
}

const isGender = (param: any): param is Gender => Object.values(Gender).includes(param)

const isString = (text: any): text is string => typeof text === 'string' || text instanceof String

const isDate = (date: string): boolean => Boolean(Date.parse(date))

const parseGender = (gender: any): string => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect gender ${gender}`)
    }
    return String(gender)
}

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect date ${date}`)
    }
    return date
}

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect name ${name}`)
    }
    return name
}

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect occupation ${occupation}`)
    }
    return occupation
}

const parseSSN = (SSN: any): string => {
    if (!SSN || !isString(SSN)) {
        throw new Error(`Incorrect SSN ${SSN}`)
    }
    return SSN
}

const generateId = (): string => {
    let id: number
    id = Math.floor(Math.random() * 1000000000000)
    return String(id)
}

export const toNewPatient = (object: any): Patient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSSN(object.ssn),
        id: generateId(),
        entries: []
    }
}
