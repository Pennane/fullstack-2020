import { NewPatient, NewEntry, Gender, HealthCheckRating, EntryDischarge, OccupationalSickLeave } from '../types'

const isHealthCheckRating = (param: any): param is HealthCheckRating => Object.values(HealthCheckRating).includes(param)

const isGender = (param: any): param is Gender => Object.values(Gender).includes(param)

const isString = (text: any): text is string => typeof text === 'string' || text instanceof String

const isObject = (o: any): o is object => typeof o === 'object' && o !== null

const isDischarge = (discharge: any): discharge is EntryDischarge =>
    isObject(discharge) && isDate((discharge as any).date) && isString((discharge as any).criteria)

const isDiagnosisCodes = (diagnosisCodes: any): diagnosisCodes is string[] =>
    Array.isArray(diagnosisCodes) && diagnosisCodes.every((code) => isString(code))

const isSickLeave = (sickLeave: any): sickLeave is OccupationalSickLeave =>
    isObject(sickLeave) && isDate((sickLeave as any).startDate) && isDate((sickLeave as any).endDate)

const isDate = (date: string): boolean => Boolean(Date.parse(date))

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect gender ${gender}`)
    }
    return gender
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

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect specialist ${specialist}`)
    }
    return specialist
}

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error(`Incorrect description ${description}`)
    }
    return description
}

const parseEmployerName = (employerName: any): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error(`Incorrect description ${employerName}`)
    }
    return employerName
}

const parseSickLeave = (sickLeave: any): OccupationalSickLeave | undefined => {
    if (!sickLeave) return undefined
    if (!sickLeave.startDate && !sickLeave.endDate) {
        return undefined
    }
    if (!isSickLeave(sickLeave)) {
        throw new Error(`Incorrect sickLeave ${sickLeave}`)
    }
    return sickLeave
}

const parseDiagnosisCodes = (diagnosisCodes: any): string[] | undefined => {
    if (!diagnosisCodes) return undefined
    if (!isDiagnosisCodes(diagnosisCodes)) {
        throw new Error(`Incorrect diagnosisCodes ${diagnosisCodes}`)
    }
    return diagnosisCodes
}

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!isHealthCheckRating(healthCheckRating)) {
        throw new Error(`Incorrect healthCheckRating ${healthCheckRating}`)
    }
    return healthCheckRating
}

const parseDischarge = (discharge: any): EntryDischarge | undefined => {
    if (!discharge) return undefined
    if (!discharge.date && !discharge.criteria) return undefined
    if (!isDischarge(discharge)) {
        throw new Error(`Incorrect discharge ${discharge}`)
    }
    return discharge
}

export const generateId = (): string => {
    let id: number
    id = Math.floor(Math.random() * 1000000000000)
    return String(id)
}

export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSSN(object.ssn),
        entries: object.entries
    }
}

const toNewHospitalDetails = (object: any) => {
    return {
        discharge: parseDischarge(object.discharge),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    }
}

const toNewOccupationalHealthCareDetails = (object: any) => {
    return {
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    }
}

const toNewHealthCheckDetails = (object: any) => {
    return {
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    }
}

const toEntryDetails = (object: any) => {
    switch (object.type) {
        case 'Hospital':
            return toNewHospitalDetails(object)
        case 'OccupationalHealthcare':
            return toNewOccupationalHealthCareDetails(object)
        case 'HealthCheck':
            return toNewHealthCheckDetails(object)
        default:
            throw new Error('Invalid object type')
    }
}

export const toNewEntry = (object: any): NewEntry => {
    return {
        ...toEntryDetails(object),
        type: object.type,
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        description: parseDescription(object.description)
    }
}
