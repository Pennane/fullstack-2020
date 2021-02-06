import diagnoses from '../data/diagnoses.json'
import { Diagnose } from '../types/types'
const get = (): Array<Diagnose> => {
    return diagnoses
}

export default {
    get
}
