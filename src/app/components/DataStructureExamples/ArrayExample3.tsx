"use client";

import { useState } from "react";

const PalindromeChecker = () => {
  const [string1, setString1] = useState<string>();
  const [string2, setString2] = useState<string>();
  const [isPalindrome, setIsPalindrome] = useState<boolean>(false);

  const handleClick = () => {
    if (string1?.length !== string2?.length) {
      setIsPalindrome(false);
    }

    if (string1 && string2) {
      const alphabetCount = new Array(26).fill(0);

      for (let i = 0; i < string1?.length; i++) {
        alphabetCount[string1.charCodeAt(i) - "a".charCodeAt(0)]++;

        alphabetCount[string2.charCodeAt(i) - "a".charCodeAt(0)]--;
      }
      setIsPalindrome(alphabetCount.every((val) => val === 0));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Palindrome Checker</h1>
      given two strings check if they are palindromes of one another.
      <div>
        <input
          type="text"
          placeholder="string1"
          className="text-black mr-2"
          onChange={(e) => setString1(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="string2"
          className="text-black mr-2"
          onChange={(e) => setString2(e.target.value)}
        ></input>
        <button
          className="bg-blue-500 hover:blue-600 p-2 mt-2"
          onMouseDown={handleClick}
        >
          check palindrome
        </button>
      </div>
      <div>
        {isPalindrome ? (
          <div>its a palindrome!</div>
        ) : (
          <div>its not a palindrome :V</div>
        )}
      </div>
    </div>
  );
};

export default PalindromeChecker;
