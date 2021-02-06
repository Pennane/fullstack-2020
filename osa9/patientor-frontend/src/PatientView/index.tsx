import React from 'react'

import { Patient } from '../types'
import HealthRatingBar from '../components/HealthRatingBar'
import { useStateValue } from '../state'
import { useParams } from 'react-router-dom'

const PatientView: React.FC = () => {
    const [{ patients }] = useStateValue()
    interface ParamTypes {
        id: string
    }
    let { id } = useParams<ParamTypes>()

    const patient: Patient | undefined = patients[id]

    if (!id) return null
    if (!patient) return <div>Patient not found for id {id}</div>

    return (
        <div className="App">
            <div>{patient.name}</div>
            <div>{patient.gender}</div>
            <div>{patient.occupation}</div>
            <div>
                <HealthRatingBar showText={false} rating={1} />
            </div>
        </div>
    )
}

export default PatientView
