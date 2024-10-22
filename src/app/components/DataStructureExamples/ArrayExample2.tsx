"use client";

import { useState } from "react";

const ContainsDuplicate = () => {
  //return true if there is a duplicate and false if there isnt one
  const [inputValue, setInputValue] = useState<string>("");
  const [duplicateBool, setDuplicateBool] = useState<boolean>(false);

  const handleSubmit = () => {
    //convert input string to an array of numbers
    const nums = inputValue.split("").map(Number);
    //checking for dups
    const set = new Set(nums);
    setDuplicateBool(set.size !== nums.length);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Check for duplicates in an array
      </h1>
      <p className="text-pretty">
        there are several approaches to this problem as there are n(n-1)/2 pairs
        of integers we could check all of these pairs to see if there are any
        duplicates by linear search this yields an algorithm that is O(n^2) time
        complecity with constant space O(1). Thought about the problem
        differently and as is a common pattern, we can sort the data before-hand
        which then results in a worst case performance of O(nlogn) after an
        array is sorted it simply needs to be swept once to see if there are any
        consecutive duplicate elements. This can be achieved with a simple line
        of code like if(nums[i]==nums[i+1]) return true. sorting is O(nlogn) and
        sweeping is O(n) thus the time is 0(nlogn). Finally one can approach
        this problem by implementing a hash set and is always good to use a
        datastructure with faster search time.
      </p>
      <div className="flex gap-2 mb-4">
        <input
          className="text-black p-2 border rounded"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter numbers 0-9"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          submit button
        </button>
      </div>
      {duplicateBool !== null && (
        <p className="text-lg">
          Does this number array contain a duplicate?{" "}
          {duplicateBool ? "Yes" : "No"}
        </p>
      )}
    </div>
  );
};

export default ContainsDuplicate;
