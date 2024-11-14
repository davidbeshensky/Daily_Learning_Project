"use client";

import { useState } from "react";

const ReinventingTheWheel = () => {
  //LINEAR SEARCH
  const [array, setArray] = useState<string[]>([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
  ]);
  const [numberArray] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const [booleanArray] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
  ]);
  const [unsortedArray] = useState<number[]>([1, 3, 7, 4, 2]);
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const targetNumber: number = 3;
  const target: string = "d";
  //implementing search on an array

  const indexOf = (array: string[], target: string) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return i;
      }
    }
    return "target not found in array";
  };

  //   BINARY SEARCH
  //   is it ordered?
  const binarySearch = (numberArray: number[], targetNumber: number) => {
    let right = numberArray.length - 1;
    let left = 0;
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (targetNumber === numberArray[mid]) {
        return mid;
      } else if (numberArray[mid] < targetNumber) {
        left = mid + 1;
      } else if (numberArray[mid] > targetNumber) {
        right = mid - 1;
      }
    }
    return "target not found in array";
  };

  const crystalBallSearch = (boolArray: boolean[]) => {
    const jumpAmount = Math.floor(Math.sqrt(boolArray.length));
    let i = jumpAmount;
    for (; i < boolArray.length; i += jumpAmount) {
      if (boolArray[i]) {
        break;
      }
    }
    i -= jumpAmount;
    for (let j = 0; j < jumpAmount && i < boolArray.length; i++) {
      if (boolArray[i]) {
        return i;
      }
    }
    return -1;
  };

  //BUBBLE SORT
  const bubbleSort = (array: number[]): number[] => {
    let unsortedCopy = array.slice();
    for (let i = 0; i < unsortedCopy.length; i++) {
      for (let j = 0; j < unsortedCopy.length - 1 - i; j++) {
        if (unsortedCopy[j] > unsortedCopy[j + 1]) {
          const tmp: number = unsortedCopy[j];
          unsortedCopy[j] = unsortedCopy[j + 1];
          unsortedCopy[j + 1] = tmp;
        }
      }
    }
    return unsortedCopy;
  };

  const handleSort = () => {
    setSortedArray(bubbleSort(unsortedArray));
  };

  return (
    <div>
      <div className="border-2 p-2 m-2">
        <h1>LINEAR SEARCH</h1>
        the index of d in our starter array is...
        <p>starter array: [{array.join(", ")}]</p>
        <p>{indexOf(array, target)}</p>
      </div>
      <div className="border-2 p-2 m-2">
        <h1>BINARY SEARCH</h1>
        the index of 3 in our number array is...
        <p>starter array: [{numberArray.join(", ")}]</p>
        <p>{binarySearch(numberArray, targetNumber)}</p>
      </div>
      <div className="border-2 p-2 m-2">
        <h1>2 CRYSTAL BALLS</h1>
        the index of the first true in our boolean array is...
        <p>starter array: [{booleanArray.join(", ")}]</p>
        <p>{crystalBallSearch(booleanArray)}</p>
      </div>
      <div className="border-2 p-2 m-2">
        <h1>BUBBLE SORT</h1>
        the new sorted array is...
        <p>starter array: [{unsortedArray.join(", ")}]</p>
        <button
          className="border-2 p-2 hover:bg-slate-800 transition-transform transform active:scale-95 active:bg-slate-500 focus:outline-none"
          onClick={handleSort}
        >
          Sort Array
        </button>
        <p>
          {sortedArray.length ? sortedArray.join(", ") : "array not sorted yet"}
        </p>
      </div>
    </div>
  );
};

export default ReinventingTheWheel;
