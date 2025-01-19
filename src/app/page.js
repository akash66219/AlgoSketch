'use client'

import { useSelector } from "react-redux";
import Link from "next/link";
import sorting from '@/../public/sorting.png'
import traversal from '@/../public/traversal.jpg'
import seive from '@/../public/seive.jpg'
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex flex-col  justify-center items-center mt-8 md:mt-16">
      <header className="bg-primary text-primary-foreground py-3 px-4 md:px-6 ">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-[60px] font-bold hover:translate-y-0 duration-500 ease-in-out">Algorithm Visualizer</h1>
            <p className="max-w-md text-[20px] text-primary-foreground/80">
              Explore and visualize various algorithms, from sorting to traversal-algorithms and explore seive of Erasthosthenes.
            </p>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32 flex-wrap">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center ">
        <Link href={'/path-finder'} className="cursor-none">
          <div className="card flex items-center flex-col  text-center bottom-2  hover:scale-[1.03] duration-500 ease-in-out">
            <Image priority={true} height={320} src={traversal} alt="sorting" className="animate-pulse"></Image>
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold hover:underline">Pathfinder Algorithms</h3>
              <p className="text-muted-foreground px-2">
                Explore the workings of Depth-first-search (DFS), Breadth-first-search (BFS) and Dijkstra algorithm
              </p>
            </div>
          </div>
          </Link>
          <Link href={'/sorting'} className="cursor-none">
          <div className="card flex items-center flex-col  hover:scale-[1.03] duration-500 ease-in-out">
            <Image priority={true} src={sorting} width={500} alt="sorting" className="animate-pulse"></Image>
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold hover:underline">Sorting Algorithms</h3>
              <p className="text-muted-foreground px-0">
                Visualize and compare the performance of various sorting algorithms, such as Bubble, Merge, 
                Quick and Selection Sort.
              </p>
            </div>
          </div>
          </Link>
          <Link href={'/seive'} className="cursor-none">
          <div className="card flex items-center flex-col  hover:scale-[1.03] duration-500 ease-in-out">
            <Image priority={true} height={320} w={500} src={seive} alt="sorting" className="animate-pulse"></Image>
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold hover:underline">Sieve Algorithm</h3>
              <p className="text-muted-foreground  px-4 ">
                Discover the Sieve of Eratosthenes, a clever algorithm for finding prime numbers.
              </p>
            </div>
          </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
