

export const optionalChaining = (obj, ...rest) => {
    let temp = obj
    let result = null
    rest?.forEach(item => {
        result = temp?.[item]
    })
    return result ?? '--'
}