export const generateBubbleSort = (array) => {
    const animationArray = [];
    const clonedArray = array.slice();

    for (let i = 0; i < clonedArray.length - 1; i++) { 
        for (let j = 0; j < clonedArray.length - i - 1; j++) { 
            animationArray.push([[j, j + 1], false]); 

            if (clonedArray[j] > clonedArray[j + 1]) {
                animationArray.push([[j, clonedArray[j + 1]], true]); 
                animationArray.push([[j + 1, clonedArray[j]], true]); 
                let temp = clonedArray[j];
                clonedArray[j] = clonedArray[j + 1];
                clonedArray[j + 1] = temp;
            }
        }
    }

    return animationArray;
}
