import diagnoses from '../data/diagnoses.json'
import { Diagnose } from '../types/types'
const getAll = (): Array<Diagnose> => {
    return diagnoses
}

export default {
    getAll
}
