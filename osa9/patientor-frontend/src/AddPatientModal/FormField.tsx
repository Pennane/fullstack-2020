import React from 'react'
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik'
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react'
import { Diagnose, Gender, HealthCheckRating } from '../types'

// structure of a single option
export type GenderOption = {
    value: Gender
    label: string
}

// props for select field component
type SelectFieldProps = {
    name: string
    label: string
    options: GenderOption[]
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, label, options }: SelectFieldProps) => (
    <Form.Field>
        <label>{label}</label>
        <Field as="select" name={name} className="ui dropdown">
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label || option.value}
                </option>
            ))}
        </Field>
    </Form.Field>
)

interface TextProps extends FieldProps {
    label: string
    placeholder: string
}

export const TextField: React.FC<TextProps> = ({ field, label, placeholder }) => (
    <Form.Field>
        <label>{label}</label>
        <Field placeholder={placeholder} {...field} />
        <div style={{ color: 'red' }}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
)

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
    label: string
    errorMessage?: string
    min: number
    max: number
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
    <Form.Field>
        <label>{label}</label>
        <Field {...field} type="number" min={min} max={max} />

        <div style={{ color: 'red' }}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
)

export const DiagnosisSelection = ({
    diagnoses,
    setFieldValue,
    setFieldTouched
}: {
    diagnoses: Diagnose[]
    setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue']
    setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched']
}) => {
    const field = 'diagnosisCodes'
    const onChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        setFieldTouched(field, true)
        setFieldValue(field, data.value)
    }

    const stateOptions = diagnoses.map((diagnosis) => ({
        key: diagnosis.code,
        text: `${diagnosis.name} (${diagnosis.code})`,
        value: diagnosis.code
    }))

    return (
        <Form.Field>
            <label>Diagnoses</label>
            <Dropdown fluid multiple search selection options={stateOptions} onChange={onChange} />
            <ErrorMessage name={field} />
        </Form.Field>
    )
}

const isHealthCheckRatingValue = (param: any): param is HealthCheckRating =>
    Object.values(HealthCheckRating).includes(param)

const parseHealthCheckRatingValue = (value: any): HealthCheckRating | null => {
    if (!value || !isHealthCheckRatingValue(value)) {
        return null
    }
    return value
}

export const HealthCheckRatingSelection = ({
    setFieldValue,
    setFieldTouched
}: {
    setFieldValue: FormikProps<{ healthCheckRating: HealthCheckRating }>['setFieldValue']
    setFieldTouched: FormikProps<{ healthCheckRating: HealthCheckRating }>['setFieldTouched']
}) => {
    const field = 'healthCheckRating'
    const onChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        setFieldTouched(field, true)
        setFieldValue(field, data.value)
    }

    const stateOptions = []

    for (let item in HealthCheckRating) {
        let val = parseHealthCheckRatingValue(item)
        if (val) {
            stateOptions.push({
                key: item,
                text: val,
                value: HealthCheckRating[item]
            })
        }
    }

    return (
        <Form.Field>
            <label>Health rating</label>
            <Dropdown fluid search selection options={stateOptions} onChange={onChange} />
            <ErrorMessage name={field} />
        </Form.Field>
    )
}
