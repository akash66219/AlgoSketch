'use client'

import { generateRandomNumberFromInterval } from "@/utils/sorting-utility";

const { createSlice } = require("@reduxjs/toolkit");

const sortingSlice = createSlice({
    initialState: {
        array: [],
        selectedAlgorithm: "bubble",
        isSorting: false,
        animationSpeed: 300,
        isAnimationComplete: true,
    },

    name: 'sorting-slice',

    reducers: {
        setArray: (state, action) => {
            state.array = action.payload
        },
        setAlgorithm: (state, action) => {
            state.selectedAlgorithm = action.payload
        },
        setIsSorting: (state, action) => {
            console.log("here", action.payload)
            state.isSorting = action.payload
            console.log(state.isSorting)
        },
        setAnimationSpeed: (state, action) => {
            state.animationSpeed = action.payload
        },
        setIsAnimationComplete: (state, action) => {
            state.isAnimationComplete = action.payload
        },
    }
})

export const sortingAction = sortingSlice.actions

export const resetArrayandAnimation = () => {
    return (dispatch) => {
        const contentContainer = document.getElementById("content-container")
        if (!contentContainer) {
            return;
        };
        const contentContainerWidth = contentContainer.clientWidth
        const tempArray = []
        const numLines = contentContainerWidth / 9
        const containerHeight = window.innerHeight
        const maxLineHeight = Math.max(containerHeight - 300, 100)
        for (let i = 0; i < numLines; i++) {
            tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight))
        }
        const highestId = window.setTimeout(() => {
            for (let i = highestId; i >= 0; i--) {
                window.clearInterval(i);
            }
        }, 0);

        setTimeout(() => {
            const arrLines = document.getElementsByClassName("bars");
            for (let i = 0; i < arrLines.length; i++) {
                arrLines[i].classList.remove("change-line-color");
                arrLines[i].classList.add("default-line-color");
            }
        }, 0);
        dispatch(sortingAction.setArray(tempArray))
        dispatch(sortingAction.setIsSorting(false))
    }
}

export const runAnimation = (animationSpeed, animationArray,sortedArray) => {
    return (dispatch) => {

        const time = (1 / animationSpeed) * 200;
        const arrLines = document.getElementsByClassName("bars")

        const updateClassList = (indexes, addClassName, removeClassName) => {
            indexes.forEach((index) => {
                arrLines[index].classList.add(addClassName)
                arrLines[index].classList.remove(removeClassName)
            });
        };

        const updateHeightValue = (lineIndex, newHeight) => {
            arrLines[lineIndex].style.height = `${newHeight}px`
        };

        animationArray.forEach((animation, index) => {
            setTimeout(() => {
                const [lineIndexes, isSwap] = animation;
                if (!isSwap) {
                    updateClassList(lineIndexes, "change-line-color", "default-line-color")
                    setTimeout(() =>
                        updateClassList(lineIndexes, "default-line-color", "change-line-color"),
                        time);
                } else {
                    const [lineIndex, newHeight] = lineIndexes
                    updateHeightValue(lineIndex, newHeight)
                }
            }, index * time);
        })

        const totalDuration = animationArray.length * time

        setTimeout(() => {
            dispatch(sortingAction.setIsSorting(false))
            dispatch(sortingAction.setArray(sortedArray))
        }, totalDuration);
    }
}


export const sortingReducer = sortingSlice.reducer