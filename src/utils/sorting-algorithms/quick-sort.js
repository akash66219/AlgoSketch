const partition = (l, r, clonedArray, animationArray) => {
    let i = l;
    let j = r + 1;
    const pivot = clonedArray[l];
    while (true) {
        while (clonedArray[++i] <= pivot) {
            if (i === r) break;
            animationArray.push([[i], false]);
        }
        while (clonedArray[--j] >= pivot) {
            if (j === l) break;
            animationArray.push([[j], false]);
        }
        if (j <= i) break;
        animationArray.push([[i, clonedArray[j]], true]);
        animationArray.push([[j, clonedArray[i]], true]);
        let temp = clonedArray[i];
        clonedArray[i] = clonedArray[j];
        clonedArray[j] = temp;
    }
    animationArray.push([[l, clonedArray[j]], true]);
    animationArray.push([[j, clonedArray[l]], true]);
    let temp = clonedArray[l];
    clonedArray[l] = clonedArray[j];
    clonedArray[j] = temp;
    return j;
}

const quickSort = (l, r, clonedArray, animationArray) => {
    if (l >= r) return
    const partitionIndex = partition(l,r,clonedArray,animationArray)
    quickSort(l, partitionIndex-1, clonedArray, animationArray)
    quickSort(partitionIndex + 1, r, clonedArray, animationArray)
}

export const generateQuickSort = (array) => {
    const animationArray = []
    const clonedArray = array.slice()
    quickSort(0, clonedArray.length - 1, clonedArray, animationArray)
    return animationArray
}
