

export const optionalChaining = (obj, ...rest) => {
    let temp = obj
    let result = null
    console.log('rest>>>', rest, obj);
    rest?.forEach(item => {
        result = temp?.[item]
    })
    return result ?? '--'
}