'use client';

import { SortingSpeedController  } from '@/components/sorting/sorting-speed-controler';
import { resetArrayandAnimation, runAnimation } from '@/store/slices/sorting-slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortingAction } from '@/store/slices/sorting-slice';
import { SortingAlgorithmSelector } from '@/components/sorting/sorting-algorithm-selector';
import { algorithmOptions, generateAnimationArray } from "@/utils/sorting-utility";

const SortingVisualizerComponent = () => {

    const sorting = useSelector(state => state.sorting)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetArrayandAnimation());
        window.addEventListener("resize", () => dispatch(resetArrayandAnimation()));

        return () => {
            window.removeEventListener("resize", () => dispatch(resetArrayandAnimation()));
        };
    }, [dispatch]);

    const handleStart = () => {
        dispatch(sortingAction.setIsSorting(true))
        const animationArray = generateAnimationArray(sorting.selectedAlgorithm, sorting.array)
        let array = [...sorting.array]
        let sortedArray = array.sort((a,b) => a-b)
        dispatch(runAnimation(sorting.animationSpeed,animationArray,sortedArray))
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center w-full mt-20 mb-14" id='content-container'>
                <div className="w-full mx-auto flex justify-center items-end">
                    {sorting.array.map((value, index) => (
                        <div
                            key={index}
                            className="relative mx-0.5 shadow-lg opacity-70 rounded-lg bg-[#0e7490] bars"
                            style={{ height: `${value}px`, width: "3px" }}
                        ></div>
                    ))}
                </div>
            </div>
            <div className='absolute bottom-5 sm:bottom-12 flex justify-center items-center w-full'>
                <div className='flex justify-center gap-x-5 md:gap-x-12 gap-y-4 items-center flex-wrap w-full'>
                    <SortingSpeedController 
                        value={sorting.animationSpeed}
                        isDisabled={sorting.isSorting}
                        handleChange={(e) => dispatch(sortingAction.setAnimationSpeed(e.target.value))}
                    />
                    <SortingAlgorithmSelector options={algorithmOptions} algorithm={sorting.selectedAlgorithm} isDisabled={sorting.isSorting} onChange={(value) => dispatch(sortingAction.setAlgorithm(value))} />
                    <button onClick={() => dispatch(resetArrayandAnimation())} className={`${false ? 'text-red-600' :'bg-gray-800'} appearance-none h-8 flex items-center w-30  bg-gray-800 border-cyan-900
                    border px-4 py-1 rounded-lg shadow cursor-none leading-tight focus:outline-none focus:shadow-outline text-gray-300 select-none `}>
                        Reset
                    </button>
                    <button onClick={handleStart} disabled={sorting.isSorting} className='appearance-none h-8 flex items-center w-30  bg-gray-800 border-cyan-900
                    border px-4 py-1 rounded-lg shadow cursor-none leading-tight focus:outline-none focus:shadow-outline text-gray-300 select-none'>
                        Start
                    </button>
                </div>
            </div>
        </div>
    )
}

const sortingVisualizer = React.memo(SortingVisualizerComponent);

export default sortingVisualizer
