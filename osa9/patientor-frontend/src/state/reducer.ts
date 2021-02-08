import { State } from './state'
import { Diagnose, Entry, Patient } from '../types'

export type Action =
    | {
          type: 'SET_PATIENT_LIST'
          payload: Patient[]
      }
    | {
          type: 'ADD_PATIENT'
          payload: Patient
      }
    | {
          type: 'SET_CURRENT_PATIENT'
          payload: Patient
      }
    | {
          type: 'SET_DIAGNOSE_LIST'
          payload: Diagnose[]
      }
    | {
          type: 'ADD_ENTRY'
          payload: Entry
      }

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENT_LIST':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
                    ...state.patients
                }
            }
        case 'ADD_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            }
        case 'SET_CURRENT_PATIENT':
            return {
                ...state,
                patient: action.payload
            }
        case 'SET_DIAGNOSE_LIST':
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce((memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }), {}),
                    ...state.diagnoses
                }
            }
        case 'ADD_ENTRY':
            if (!state.patient) return state
            return {
                ...state,
                patient: {
                    ...state.patient,
                    entries: [...state.patient.entries, action.payload]
                }
            }
        default:
            return state
    }
}

export const setDiagnoseList = (payload: Diagnose[]) => {
    return {
        type: 'SET_DIAGNOSE_LIST',
        payload: payload
    } as Action
}

export const setPatientList = (payload: Patient[]) => {
    return {
        type: 'SET_PATIENT_LIST',
        payload: payload
    } as Action
}

export const addPatient = (payload: Patient) => {
    return {
        type: 'ADD_PATIENT',
        payload: payload
    } as Action
}

export const setPatient = (payload: Patient) => {
    return {
        type: 'SET_CURRENT_PATIENT',
        payload: payload
    } as Action
}

export const addEntry = (payload: Entry) => {
    return {
        type: 'ADD_ENTRY',
        payload: payload
    } as Action
}
