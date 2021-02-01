// { periodLength: 7,
//     trainingDays: 5,
//     success: false,
//     rating: 2,
//     ratingDescription: 'not too bad but could be better',
//     target: 2,
//     average: 1.9285714285714286 }

const mapScore = (score: number): string => {
    if (score <= 0.75) {
        return 'not very good at all'
    } else if (score >= 0.75 && score <= 1.5) {
        return 'passes for now'
    } else if (score >= 1.5 && score <= 2.25) {
        return 'could be better'
    } else if (score >= 2.25 && score <= 2.65) {
        return 'starting to get there'
    } else if (score >= 2.65) {
        return 'hyper'
    }

    return 'Badly formatted score'
}

interface exerciseResponse {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: string
    ratingDescription: string
    target: number
    average: number
}

const calculateExcercises = (a: Array<number>, target: number): exerciseResponse => {
    let score = ((a.filter((i) => i >= target).length / a.length) * 3).toFixed(1)
    let response = {
        periodLength: a.length,
        trainingDays: a.filter((i) => i > 0).length,
        success: a.every((i) => i >= target),
        rating: score,
        ratingDescription: mapScore(Number(score)),
        target: target,
        average: a.reduce((p, c) => p + c, 0) / a.length
    }
    return response
}

export default calculateExcercises
