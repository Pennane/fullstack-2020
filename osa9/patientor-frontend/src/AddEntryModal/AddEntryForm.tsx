import React, { useState } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import { Field, Formik, Form } from 'formik'
import { TextField, GenderOption, DiagnosisSelection, HealthCheckRatingSelection } from '../AddPatientModal/FormField'
import { Gender, Entry, HospitalEntry, OccupationalHealthCareEntry, HealthCheckEntry } from '../types'
import { useStateValue } from '../state'

export type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>
export type OccupationalHealthCareEntryFormValues = Omit<OccupationalHealthCareEntry, 'id'>
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, 'id'>
export type EntryFormValues =
    | HospitalEntryFormValues
    | OccupationalHealthCareEntryFormValues
    | HealthCheckEntryFormValues

interface MainProps {
    onSubmit: (values: EntryFormValues) => void
    onCancel: () => void
}

interface HospitalProps {
    onSubmit: (values: HospitalEntryFormValues) => void
    onCancel: () => void
}

interface OccupationalProps {
    onSubmit: (values: OccupationalHealthCareEntryFormValues) => void
    onCancel: () => void
}

interface HealthcheckProps {
    onSubmit: (values: HealthCheckEntryFormValues) => void
    onCancel: () => void
}

export const AddHospitalEntryForm: React.FC<HospitalProps> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue()

    return (
        <Formik
            initialValues={{
                type: 'Hospital',
                description: '',
                specialist: '',
                date: '',
                diagnosisCodes: [],
                discharge: {
                    date: '',
                    criteria: ''
                }
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = 'Field is required'
                const invalidDateError = 'Please enter a valid date'
                const isDate = (date: string): boolean => Boolean(Date.parse(date))
                const errors: { [field: string]: string } = {}

                if (values.type !== 'Hospital') {
                    errors.type = 'Type is invalid. Try refreshing.'
                    return errors
                }

                if (!values.description) {
                    errors.description = requiredError
                }

                if (!values.specialist) {
                    errors.specialist = requiredError
                }

                if (!values.date) {
                    errors.date = requiredError
                }

                if (!isDate(values.date)) {
                    errors.date = invalidDateError
                }

                return errors
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field label="Description" placeholder="description" name="description" component={TextField} />
                        <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
                        <Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
                        <DiagnosisSelection
                            diagnoses={Object.values(diagnoses)}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                        />
                        <Field
                            label="Discharge Date"
                            placeholder="YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
                        />
                        <Field
                            label="Discharge Criteria"
                            placeholder="discharge criteria"
                            name="discharge.criteria"
                            component={TextField}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}

export const AddOccupationalEntryForm: React.FC<OccupationalProps> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue()

    return (
        <Formik
            initialValues={{
                type: 'OccupationalHealthcare',
                description: '',
                specialist: '',
                date: '',
                diagnosisCodes: [],
                employerName: '',
                sickLeave: {
                    endDate: '',
                    startDate: ''
                }
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = 'Field is required'
                const invalidDateError = 'Please enter a valid date'
                const isDate = (date: string): boolean => Boolean(Date.parse(date))
                const errors: { [field: string]: string } = {}
                if (values.type !== 'OccupationalHealthcare') {
                    errors.type = 'Type is invalid. Try refreshing.'
                    return errors
                }
                if (!values.description) {
                    errors.description = requiredError
                }
                if (!values.specialist) {
                    errors.specialist = requiredError
                }
                if (!isDate(values.date)) {
                    errors.date = invalidDateError
                }
                if (!values.employerName) {
                    errors.employerName = requiredError
                }
                if (values.sickLeave) {
                    if (values.sickLeave.startDate && !values.sickLeave.endDate) {
                        errors.sickLeaveEndDate = requiredError
                    } else if (!values.sickLeave.startDate && values.sickLeave.endDate) {
                        errors.sickLeaveStartDate = requiredError
                    }
                }

                if (values.sickLeave && values.sickLeave.startDate && !isDate(values.sickLeave.startDate)) {
                    errors.sickLeaveStartDate = invalidDateError
                }
                if (values.sickLeave && values.sickLeave.endDate && !isDate(values.sickLeave.endDate)) {
                    errors.sickLeaveEndDate = invalidDateError
                }
                return errors
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field label="Description" placeholder="description" name="description" component={TextField} />
                        <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
                        <Field label="Specialist" placeholder="specialist" name="specialist" component={TextField} />
                        <Field
                            label="Employer Name"
                            placeholder="employer name"
                            name="employerName"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            diagnoses={Object.values(diagnoses)}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                        />
                        <Field
                            label="Sickleave Start date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.startDate"
                            component={TextField}
                        />
                        <Field
                            label="Sickleave End date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.endDate"
                            component={TextField}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}

export const AddHealthCheckEntryForm: React.FC<HealthcheckProps> = ({ onSubmit, onCancel }) => {
    return (
        <Formik
            initialValues={{
                type: 'HealthCheck',
                description: '',
                specialist: '',
                date: '',
                healthCheckRating: 0
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = 'Field is required'
                const invalidDateError = 'Please enter a valid date'
                const invalidHealthCheckRating = 'Invalid health check rating, pass number between 0 and 3'
                const isDate = (date: string): boolean => Boolean(Date.parse(date))
                const errors: { [field: string]: string } = {}

                if (values.type !== 'HealthCheck') {
                    errors.type = 'Type is invalid. Try refreshing.'
                    return errors
                }

                if (!values.description) {
                    errors.description = requiredError
                }

                if (!values.specialist) {
                    errors.specialist = requiredError
                }

                if (!values.date) {
                    errors.date = requiredError
                }

                if (!isDate(values.date)) {
                    errors.date = invalidDateError
                }

                if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
                    errors.healthCheckRating = invalidHealthCheckRating
                }
                return errors
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field label="Description" placeholder="description" name="description" component={TextField} />
                        <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
                        <Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
                        <HealthCheckRatingSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}

export const AddEntryForm: React.FC<MainProps> = ({ onSubmit, onCancel }) => {
    let [type, setType] = useState('HospitalEntry')

    const handleSubmit = (values: EntryFormValues) => {
        onSubmit(values)
    }

    const handleCancel = () => {
        onCancel()
    }

    const updateType = (target: HTMLInputElement) => {
        setType(target.value)
    }

    return (
        <div>
            <form>
                <input
                    type="radio"
                    name="entry-type"
                    value="HospitalEntry"
                    defaultChecked
                    onClick={(e) => updateType(e.target as HTMLInputElement)}
                    readOnly
                />
                Hospital
                <input
                    type="radio"
                    name="entry-type"
                    value="OccupationalHealthCareEntry"
                    onClick={(e) => updateType(e.target as HTMLInputElement)}
                />
                Occupational
                <input
                    type="radio"
                    name="entry-type"
                    value="HealthCheckEntry"
                    onClick={(e) => updateType(e.target as HTMLInputElement)}
                />
                Health check
            </form>
            {type === 'HospitalEntry' && <AddHospitalEntryForm onSubmit={handleSubmit} onCancel={handleCancel} />}
            {type === 'OccupationalHealthCareEntry' && (
                <AddOccupationalEntryForm onSubmit={handleSubmit} onCancel={handleCancel} />
            )}
            {type === 'HealthCheckEntry' && <AddHealthCheckEntryForm onSubmit={handleSubmit} onCancel={handleCancel} />}
        </div>
    )
}

export default AddEntryForm
