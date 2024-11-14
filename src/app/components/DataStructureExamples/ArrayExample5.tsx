"use client";

import { useState } from "react";

type StringObject = {
  [key: string]: string[];
};

const GroupAnagrams = () => {
  const [anagramObject, setAnagramObject] = useState<StringObject>({});
  const [testGroup, setTestGroup] = useState<string[]>([]);

  const anagramGroups: string[][] = [
    ["act", "pots", "tops", "cat", "stop", "hat"],
    ["listen", "enlist", "silent", "tinsel", "rat", "tar"],
    ["elbow", "below", "bored", "robed", "ear", "are", "era"],
    ["finder", "friend", "night", "thing"],
    ["brag", "grab", "dusty", "study", "save", "vase"],
    ["angel", "glean", "angle", "heart", "earth", "hater"],
    ["stressed", "desserts", "race", "care", "acre"],
    ["fired", "fried", "rail", "liar"],
    ["spear", "spare", "parse", "alert", "alter", "later"],
    ["evil", "vile", "veil", "live", "stop", "tops", "opts"],
  ];

  const handleRandomPress = () => {
    const randomInt = Math.floor(Math.random() * 10);
    setTestGroup(anagramGroups[randomInt]);
  };

  const displayAnagramGroups = (strs: string[]) => {
    const newAnagramObject: StringObject = {};
    for (let s of strs) {
      const sortedS = s.split("").sort().join("");

      if (!newAnagramObject[sortedS]) {
        newAnagramObject[sortedS] = [];
      }
      newAnagramObject[sortedS].push(s);
    }
    setAnagramObject(newAnagramObject);
  };

  return (
    <div className="pt-8">
        <h1 className="text-2xl font-bold" >GROUP ANAGRAMS</h1>
      <button
        className="p-2 rounded-md bg-blue-500 hover:bg-blue-600"
        onClick={handleRandomPress}
      >
        press me for random anagrams
      </button>
      <ul className="flex">
        {testGroup.map((word, index) => (
          <li className="px-1" key={index}>{word}</li>
        ))}
      </ul>
      <button className="p-2 rounded-md bg-blue-500 hove:bg-blue-700" onClick={() => displayAnagramGroups(testGroup)}>
        generate anagram groupings
      </button>
      <div>
        <ul>
          {Object.entries(anagramObject).map(([key, group], index) => (
            <li key={index}>
              <strong>{key}:</strong>
              {group.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupAnagrams;
