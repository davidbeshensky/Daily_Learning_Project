"use client";

import React, { useState } from "react";

const TwoSum = () => {
  //lets make a function that takes numbers and adds them to an array for input.
  const [array, setArray] = useState<number[]>([]);
  const [numberInput, setNumberInput] = useState<string>("");
  const [targetInput, setTargetInput] = useState<string>("");
  const [result, setResult] = useState<number[] | null>(null);

  const handleSubmit = () => {
    if (!isNaN(parseInt(numberInput))) {
      setArray([...array, parseInt(numberInput)]);
      setNumberInput("");
    }
  };

  const handleTargetSubmit = () => {
    //handle logic for twoSum here
    const map = new Map<number, number>();
    for (let index = 0; index < array.length; index++) {
        const num = array[index];
        const complement = parseInt(targetInput) - num;
        const sumIndex = map.get(complement);
        const isTarget = map.has(complement);

        if (isTarget) {
            setResult([sumIndex!, index]);
            return;
        }
        map.set(num,index);
    }
    setResult([-1, -1]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleSubmit();
    }
  };

  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold">Two Sum</h1>
      <input
        type="number"
        placeholder="enter a number"
        className="text-black p-1 rounded"
        value={numberInput}
        onChange={(e) => setNumberInput(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 mx-2 rounded-md p-1 "
      >
        add a number onclick, enter or space
      </button>
      <div>
        <p>Array: {array.join(", ")}</p>
      </div>

      <div className="custom-shadow py-10">
        <input
          type="number"
          placeholder="enter a number"
          className="text-black mx-4"
          value={targetInput}
          onChange={(e) => setTargetInput(e.target.value)}
        ></input>
        <button
          onClick={handleTargetSubmit}
          className="bg-blue-500 p-1 rounded-md hover:bg-blue-600"
        >
          enter target value for two sum.
        </button>

        <div className='bg-pink-500 p-1 m-2'>
            {result && result[0] !== -1 ? (
                <p>Indicies: {result[0]}, {result[1]}</p>
            ) : (
                result && <p>no two numbers were found to be the sum of the target</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default TwoSum;