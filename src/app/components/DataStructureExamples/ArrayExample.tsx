// app/components/DataStructureExamples/ArrayExample.tsx
'use client';

import { useState } from 'react';

export default function ArrayExample() {
  const [array, setArray] = useState<number[]>([1, 2, 3]);

  const addItem = () => {
    setArray([...array, array.length + 1]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Array Example</h2>
      <p>Current Array: {JSON.stringify(array)}</p>
      <button
        onClick={addItem}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Add Item
      </button>
    </div>
  );
}
