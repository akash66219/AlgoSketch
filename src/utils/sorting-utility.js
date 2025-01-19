import { generateBubbleSort } from "./sorting-algorithms/bubble-sort";
import { generateMergeSort } from "./sorting-algorithms/merge-sort";
import { generateQuickSort } from "./sorting-algorithms/quick-sort";
import { generateSelectionSort } from "./sorting-algorithms/selection-sort";

export function generateRandomNumberFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generateAnimationArray = (algorithm, array) => {
    let animationArray = []
    if(algorithm === 'bubble'){
        animationArray = generateBubbleSort(array)
    }else if(algorithm === 'selection'){
        animationArray = generateSelectionSort(array)
    }else if(algorithm === 'merge'){
        animationArray = generateMergeSort(array)
    }else if(algorithm === 'quick'){
        animationArray = generateQuickSort(array)
    }
    return animationArray;
}

export const algorithmOptions = [
    { label: "Merge", value: "merge" },
    { label: "Bubble", value: "bubble" },
    { label: "Selection", value: "selection" },
    { label: "Quick", value: "quick" },
];
