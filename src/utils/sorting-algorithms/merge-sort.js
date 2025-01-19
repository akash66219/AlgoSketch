const mergeLeftAndRight = (l, mid, r, clonedArray, animationArray) => {
    let i = 0
    let j = 0
    let k = l
    const left = clonedArray.slice(l, mid + 1)
    const right = clonedArray.slice(mid + 1, r + 1)

    while (i < left.length && j < right.length) {
        animationArray.push([[l + i, mid + 1 + j], false])
        if (left[i] <= right[j]) {
            animationArray.push([[k, left[i]], true])
            clonedArray[k++] = left[i++]
        } else {
            animationArray.push([[k, right[j]], true])
            clonedArray[k++] = right[j++]
        }
    }
    while (i < left.length) {
        animationArray.push([[l + i], false])
        animationArray.push([[k, left[i]], true])
        clonedArray[k++] = left[i++]
    }
    while (j < right.length) {
        animationArray.push([[mid + 1 + j], false])
        animationArray.push([[k, right[j]], true])
        clonedArray[k++] = right[j++]
    }
}

const mergeSort = (l, r, clonedArray, animationArray) => {
    if (l >= r) return
    const mid = Math.floor((l + r) / 2)
    mergeSort(l, mid, clonedArray, animationArray)
    mergeSort(mid + 1, r, clonedArray, animationArray)
    mergeLeftAndRight(l, mid, r, clonedArray, animationArray)
}

export const generateMergeSort = (array) => {
    const animationArray = []
    const clonedArray = array.slice()
    mergeSort(0, clonedArray.length - 1, clonedArray, animationArray)
    return animationArray
}
