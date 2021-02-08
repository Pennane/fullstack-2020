import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Button, Divider, Header, Container } from 'semantic-ui-react'

import { apiBaseUrl } from './constants'
import { useStateValue, setPatientList, setDiagnoseList } from './state'

import { Diagnose, Patient } from './types'

import PatientListPage from './PatientListPage'
import PatientView from './PatientPage'

const App: React.FC = () => {
    const [, dispatch] = useStateValue()
    React.useEffect(() => {
        axios.get<void>(`${apiBaseUrl}/ping`)

        const fetchPatientList = async () => {
            try {
                const { data: patientListFromApi } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`)
                dispatch(setPatientList(patientListFromApi))
            } catch (e) {
                console.error(e)
            }
        }
        fetchPatientList()
        const fetchDiagnoses = async () => {
            try {
                const { data: diagnoseListFromApi } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`)
                dispatch(setDiagnoseList(diagnoseListFromApi))
            } catch (e) {
                console.error(e)
            }
        }

        fetchDiagnoses()
    }, [dispatch])

    return (
        <div className="App">
            <Router>
                <Container>
                    <Header as="h1">Patientor</Header>
                    <Button as={Link} to="/" primary>
                        Home
                    </Button>
                    <Divider hidden />
                    <Switch>
                        <Route path="/patients/:id">
                            <PatientView />
                        </Route>
                        <Route path="/">
                            <PatientListPage />
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </div>
    )
}

export default App
