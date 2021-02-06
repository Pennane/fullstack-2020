const calculateBmiValue = (height: number, mass: number): number => {
    const meters = height / 100
    const BMI = mass / meters ** 2
    return BMI
}

const mapBmiValue = (value: number): string | null => {
    switch (true) {
        case value <= 15:
            return 'Very severely underweight'
        case value > 15 && value <= 16:
            return 'Severely underweight'
        case value > 16 && value <= 18.5:
            return 'Underweight'
        case value > 18.5 && value <= 25:
            return 'Normal (healthy weight)'
        case value > 25 && value <= 30:
            return 'Overweight'
        case value > 30 && value <= 35:
            return 'Obese Class I (Moderately obese)'
        case value > 35 && value <= 40:
            return 'Obese Class II (Severely obese)'
        case value > 40:
            return 'Obese Class III (Very severely obese)'
        default:
            return null
    }
}

const calculateBmi = (height: number, mass: number): string | null => {
    const value = calculateBmiValue(height, mass)
    const mapped = mapBmiValue(value)
    return mapped
}

export default calculateBmi
