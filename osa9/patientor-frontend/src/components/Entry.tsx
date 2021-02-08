import React from 'react'
import { useStateValue } from '../state'
import { HealthCheckEntry, Entry, HospitalEntry, OccupationalHealthCareEntry } from '../types'
import { assertNever } from '../utils'
import HealthRatingBar from './HealthRatingBar'

const Diagnoses = ({ entryDiagnoseCodes }: { entryDiagnoseCodes: string[] | undefined }) => {
    const [{ diagnoses }] = useStateValue()
    return (
        <>
            {entryDiagnoseCodes && (
                <ul>
                    {entryDiagnoseCodes.map((code, i) => (
                        <li key={i}>
                            {code}
                            {diagnoses[code] && <span> {diagnoses[code].name}</span>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <div>
            {entry.discharge && (
                <div>
                    discharge:
                    <div>
                        Date: {entry.discharge.date} &nbsp; Criteria: {entry.discharge.criteria}
                    </div>
                </div>
            )}
            <Diagnoses entryDiagnoseCodes={entry.diagnosisCodes} />
        </div>
    )
}

const OccupationalEntryComponent = ({ entry }: { entry: OccupationalHealthCareEntry }) => {
    console.log(entry)
    return (
        <div>
            <span>Employer: {entry.employerName} </span>

            {entry.sickLeave && (
                <div>
                    Sickleave:
                    <div>
                        From: {entry.sickLeave.startDate}&nbsp;To: {entry.sickLeave.endDate}
                    </div>
                </div>
            )}
            <Diagnoses entryDiagnoseCodes={entry.diagnosisCodes} />
        </div>
    )
}

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <div>
            <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
        </div>
    )
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryComponent entry={entry} />
        case 'OccupationalHealthcare':
            return <OccupationalEntryComponent entry={entry} />
        case 'HealthCheck':
            return <HealthCheckEntryComponent entry={entry} />
        default:
            return assertNever(entry)
    }
}

const EntryComponent = ({ entry }: { entry: Entry }) => {
    const style = {
        border: '1px solid black',
        marginBottom: 5,
        padding: 7
    }
    return (
        <div style={style}>
            <p>{entry.type}</p>
            <span>{entry.date} </span>
            <span>{entry.description}</span>
            <EntryDetails entry={entry} />
        </div>
    )
}

export default EntryComponent
