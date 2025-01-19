'use client'

import { Grid } from '@/components/path-finder/grid'
import { PathfinderAlgorithmSelector } from '@/components/path-finder/pathfinder-algorithm-selector'
import { PathfinderSpeedController } from '@/components/path-finder/pathfinder-speed-controller'
import { generateMaze, pathFinderActions, resetGrid, runPathAnimation } from '@/store/slices/pathfinder-slice'
import { useDispatch, useSelector } from 'react-redux'
import {  generatePath, pathFinderAlgorithms } from '@/utils/pathfinder-utility'

const PathFinder = () => {
  const { grid, traversalSpeed, startNode, endNode, algorithm ,isVisualizationRunning, isGraphTraversed} = useSelector(state => state.pathFinder)
  const dispatch = useDispatch()
  const handleStart = () => {
    const { path, traversedNode } = generatePath(grid, startNode, endNode, algorithm)
    dispatch(pathFinderActions.setisGraphTraversed(false))
    dispatch(pathFinderActions.setVisualizerRunning(true))
    dispatch(runPathAnimation(path, traversedNode, traversalSpeed, startNode, endNode))
  }
  const generateMazeHandler = () => {
    dispatch(pathFinderActions.setVisualizerRunning(true))
    dispatch(pathFinderActions.setisGraphTraversed(true))
    dispatch(resetGrid())
    dispatch(generateMaze(grid, startNode, endNode, false, traversalSpeed))
  }
  const resetHandler = () => {
    dispatch(pathFinderActions.setisGraphTraversed(true))
    dispatch(resetGrid())
  }
  return (
    <div>
      <div>
        <Grid />
      </div>
      <div className='absolute bottom-5 sm:bottom-12 flex justify-center items-center w-[100vw]'>
        <div className='flex justify-center gap-x-5 md:gap-x-12 gap-y-4 items-center flex-wrap w-full'>
          <PathfinderSpeedController
            value={traversalSpeed}
            isDisabled={false}
            handleChange={(e) => dispatch(pathFinderActions.setTraversalSpeed(e.target.value))}
          />
          <PathfinderAlgorithmSelector options={pathFinderAlgorithms} algorithm={algorithm} isDisabled={isVisualizationRunning} onChange={(value) => dispatch(pathFinderActions.setAlgorithm(value))} />
          <button onClick={generateMazeHandler} disabled={isVisualizationRunning} className={`${isVisualizationRunning ? 'text-red-600' : 'bg-gray-800'} appearance-none h-8 flex items-center w-30  bg-gray-800 border-cyan-900
                    border px-4 py-1 rounded-lg shadow cursor-none leading-tight focus:outline-none focus:shadow-outline text-gray-300 select-none `}>
            Generate Maze
          </button>
          <button onClick={resetHandler} disabled={isVisualizationRunning} className={`${isVisualizationRunning ? 'text-red-600' : 'bg-gray-800'} appearance-none h-8 flex items-center w-30  bg-gray-800 border-cyan-900
                    border px-4 py-1 rounded-lg shadow cursor-none leading-tight focus:outline-none focus:shadow-outline text-gray-300 select-none `}>
            Reset
          </button>
          <button onClick={handleStart} disabled={isVisualizationRunning || !isGraphTraversed} className={`${isVisualizationRunning || !isGraphTraversed ? 'text-red-600' : 'bg-gray-800'} appearance-none h-8 flex items-center w-30  bg-gray-800 border-cyan-900
                    border px-4 py-1 rounded-lg shadow cursor-none leading-tight focus:outline-none focus:shadow-outline text-gray-300 select-none `}>
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default PathFinder
