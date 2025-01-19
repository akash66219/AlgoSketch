'use client'
import { useState, useEffect } from 'react';
import { delay } from '@/utils/pathfinder-utility';
import { SeiveSpeedController } from '@/components/seive/seive-speed-controller';

const SieveOfEratosthenes = () => {
  const [result, setResult] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [ms, setMs] = useState(250);
  const [isAlgorithmComplete, setAlgorithmComplete] = useState(false)
  const [isAlgorithmRunning, setAlgorithmRunning] = useState(false)
  console.log(ms)
  useEffect(() => {
    displayNumbers();
  }, []);

  const displayNumbers = () => {
    const numArray = [];
    for (let i = 1; i <= 1000; i++) {
      numArray.push({ id: i, className: '' });
      if (i === 1) {
        numArray[numArray.length - 1].className = 'one';
      } else {
        numArray[numArray.length - 1].className = '';
      }
    }
    setNumbers(numArray);
  };

  const notPrime = async (num) => {
    for (let i = 0; i < num.length; i++) {
      const index = numbers.findIndex((n) => n.id === num[i]);
      const newNumbers = [...numbers];
      newNumbers[index].className = 'notPrime';
      setNumbers(newNumbers);
      await delay(ms / 8);
    }
  };

  const primeSieveAlgo = async () => {
    return new Promise(async (resolve) => {
      const arr = new Array(1001).fill(false);
      arr[0] = true;

      for (let i = 2; i < arr.length; i++) {
        await delay(ms / 4);
        let num = [];
        if (arr[i] === false) {
          const index = numbers.findIndex((n) => n.id === i);
          const newNumbers = [...numbers];
          newNumbers[index].className = 'green-600';
          setNumbers(newNumbers);
          for (let j = i * i; j <= 1000; j += i) {
            arr[j] = true;
            const multipleIndex = numbers.findIndex((n) => n.id === j);
            newNumbers[multipleIndex].className = 'multiple';
            setNumbers(newNumbers);
            num.push(j);
          }
          newNumbers[index].className = 'prime';
          setNumbers(newNumbers);
          setResult((prevResult) => [...prevResult, i]);
          await notPrime(num);
        }
        if (i == arr.length - 1) {
          setAlgorithmComplete(true)
          resolve()
        }
      }
    })
  };

  const handleStart = async () => {
    setAlgorithmRunning(true)
    setResult([]);
    await primeSieveAlgo();
    setAlgorithmRunning(false)
  };

  const handleReset = () => {
    setResult([]);
    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
        window.clearTimeout(i);
      }
    }, 0);
    setAlgorithmComplete(false)
    setAlgorithmRunning(false)
    displayNumbers();
  };


  return (
    <div className="flex flex-wrap items-center p-4 w-full">
      <div id="soe" className="flex w-full flex-wrap">
        {numbers.map((num) => (
          <div
            key={num.id}
            id={`cell-${num.id}`}
            className={`cell ${num.className} flex justify-center items-center w-10 h-10 text-center border border-cyan-600 `}
          >
            <p className='text-red-700 font text-[15px]'>{num.id}</p>
          </div>
        ))}
      </div>
      <div id="result" className="mt-4 text-lg">
        Primes : {result.join(', ')}
      </div>
      <div className='absolute bottom-5 sm:bottom-12 flex justify-center items-center w-full'>
        <div className='flex justify-center gap-x-5 md:gap-x-12 gap-y-4 items-center flex-wrap'>
          <SeiveSpeedController
            value={500 - ms}
            isDisabled={isAlgorithmRunning}
            handleChange={(e) => setMs(500 - e.target.value)}
          />
          <button onClick={handleReset} className={`${false ? 'text-red-600' : 'bg-gray-800'} appearance-none h-8 flex items-center w-30  bg-gray-800 border-cyan-900
                    border px-4 py-1 rounded-lg shadow cursor-none leading-tight focus:outline-none focus:shadow-outline text-gray-300 select-none `}>
            Reset
          </button>
          <button onClick={handleStart} disabled={isAlgorithmRunning || isAlgorithmComplete} className={`${isAlgorithmRunning || isAlgorithmComplete ? 'text-red-600' : 'bg-gray-800'} appearance-none h-8 flex items-center w-30  bg-gray-800 border-cyan-900
                    border px-4 py-1 rounded-lg shadow cursor-none leading-tight focus:outline-none focus:shadow-outline text-gray-300 select-none `}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default SieveOfEratosthenes;
