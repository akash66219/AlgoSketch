// Assuming this file is located at src/pages/index.js or similar
'use client'
import { Provider } from 'react-redux';
import store from "@/store/store";
import MainHeader from '@/components/main-header';
import CustomCursor from '@/components/custom-cursor';
import React, { useState, useEffect } from 'react';

export default function PopulateStore({ data, children }) {
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        const handleMouseLeave = (event) => {
            if (event.clientY <= 0 || event.clientX <= 0 || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight) {
                setCursorVisible(false)
            }
        };
        const handleMouseEnter = () => {
            setCursorVisible(true)
        };
        window.addEventListener('mouseout', handleMouseLeave);
        window.addEventListener('mouseover', handleMouseEnter);
        return () => {
            window.removeEventListener('mouseout', handleMouseLeave);
            window.removeEventListener('mouseover', handleMouseEnter);
        };
    }, []);

    return (
        <Provider store={store}>
            {cursorVisible && <CustomCursor />}
            <MainHeader />
            {children}
        </Provider>
    );
}
