export const generateSelectionSort = (array) => {
    const animationArray = [];
    const clonedArray = array.slice();

    for (let i = 0; i < clonedArray.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < clonedArray.length; j++) {
            animationArray.push([[j, minIndex], false]);
            if (clonedArray[j] < clonedArray[minIndex]) {
                minIndex = j;
            }
        }
        animationArray.push([[i, clonedArray[minIndex]], true]);
        animationArray.push([[minIndex, clonedArray[i]], true]);
        let temp = clonedArray[i];
        clonedArray[i] = clonedArray[minIndex];
        clonedArray[minIndex] = temp;
    }

    return animationArray;
}
