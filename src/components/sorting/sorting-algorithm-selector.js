'use client'
import { algorithmOptions } from "@/utils/sorting-utility";
import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
export const SortingAlgorithmSelector = ({ options, algorithm = "bubble", onChange, isDisabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectHandler = (value) => {
        onChange(value);
        setIsOpen(false)
    }

    const algorithmLabel = algorithmOptions.reduce((acc, curr_algorithm) => {
        if (curr_algorithm.value === algorithm) {
            return curr_algorithm.label;
        }
        return acc;
    }, '');

    return (
        <div className="relative inline-block text-left">
            <div>
                <div
                    className="appearance-none h-8 flex items-center w-32  bg-gray-800 border-cyan-900
                    border px-4 py-1 rounded-lg shadow cursor-none leading-tight focus:outline-none focus:shadow-outline text-gray-300 select-none"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                >
                    <div className="flex justify-evenly w-full items-center">
                        <p className={`${isDisabled ? 'text-red-600' : 'text-white'}`}>{algorithmLabel}</p>
                        <div className="w-full ml-auto"><IoIosArrowUp className="ml-auto" /></div>
                    </div>
                </div>
            </div>

            {isOpen && !isDisabled && (
                <div
                    className="origin-top-right absolute left-0 bottom-9 cursor-none mt-1 w-32 rounded-md shadow-lg bg-gray-800 border-cyan-900  ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <ul className="py-1" role="none">
                        {
                            options.map((option, index) => (
                                <li
                                    className="block px-4 py-1 text-sm cursor-none"
                                    role="menuitem"
                                    key={index}
                                    value={option.value} 
                                    onClick={() => selectHandler(option.value)} 
                                >
                                    {option.label}
                                </li>
                            ))
                        }
                    </ul>
                </div>

            )}
        </div>
    );
};

