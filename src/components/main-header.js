import React from 'react'
import NavLink from './nav-link'
import Link from 'next/link'

const MainHeader = () => {
  return (
    <div className='flex h-[80px] justify-around items-center main-header'>
        <div className='text-[20px] font-semibold'>
            <Link href={'/'} className='cursor-none'>AlgoSketch</Link>
        </div>
        <div>
            <ul className='flex gap-20'> 
                <NavLink href={'/sorting'}>Sorting</NavLink>
                <NavLink href={'/path-finder'}>Path-Finder</NavLink>
                <NavLink href={'/seive'}>Seive</NavLink>
            </ul>
        </div>
      
    </div>
  )
}

export default MainHeader
