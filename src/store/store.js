'use client'

import {configureStore} from '@reduxjs/toolkit'
import {sortingReducer} from './slices/sorting-slice';
import { pathFinderReducer } from './slices/pathfinder-slice';

const store = configureStore({
    reducer:{
        sorting: sortingReducer,
        pathFinder: pathFinderReducer
    }

})

export default store;