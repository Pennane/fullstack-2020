import React from 'react'
import axios from 'axios'

import { Button } from 'semantic-ui-react'
import { useStateValue, setPatient, addEntry } from '../state'
import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../constants'
import { Entry, Patient } from '../types'
import EntryComponent from '../components/Entry'
import AddEntryModal from '../AddEntryModal'
import { EntryFormValues } from '../AddEntryModal/AddEntryForm'

const PatientView: React.FC = () => {
    const [{ patient }, dispatch] = useStateValue()

    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | undefined>()

    let { id } = useParams<{ id: string }>()

    const openModal = (): void => setModalOpen(true)

    const closeModal = (): void => {
        setModalOpen(false)
        setError(undefined)
    }

    if (!id) return null

    const getPatient = async () => {
        try {
            const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
            dispatch(setPatient(patient))
        } catch (e) {
            console.error(e)
        }
    }

    const submitNewEntry = async (values: EntryFormValues) => {
        if (!patient || !patient.id) return
        try {
            const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patient.id}/entries`, values)
            dispatch(addEntry(newEntry))
            closeModal()
        } catch (e) {
            console.error(e.response.data)
            setError(e.response.data.error)
        }
    }

    if (!patient || patient.id !== id) {
        getPatient()
        return null
    }

    return (
        <div className="App">
            <h3>{patient.name}</h3>
            <div>{patient.gender}</div>
            <p>ssn: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h4>Entries:</h4>
            <AddEntryModal modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal} />
            <Button onClick={() => openModal()}>Add new entry</Button>
            {patient.entries &&
                patient.entries.map((entry) => {
                    return <EntryComponent key={entry.id} entry={entry} />
                })}
        </div>
    )
}

export default PatientView
