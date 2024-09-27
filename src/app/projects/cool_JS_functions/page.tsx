'use client'

import React, {useState} from 'react';

type ExampleData = {
    numbers: number[];
    words: string[];
};

const MapReduceFilterDemo: React.FC = () => {
    const initialData: ExampleData = {
        numbers: [1,2,3,4,5],
        words: ['apple', 'banana', 'cherry', 'date', 'elderberry']
    };

    const [data, setData] = useState(initialData);

    //Map example - multiplying each number by 2
    const mappedNumbers = data.numbers.map((num) => num * 2);

    //filter numbers less than 4
    const filteredNumbers = data.numbers.filter((num) => num < 4);

    // sum up all the numbers
    const reducedSum = data.numbers.reduce((acc, num) => acc + num, 0)
    
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1 className="p-2">Map, Reduce, and Filter Example</h1>
    
          <h2 className="p-2 border-2">Original Data</h2>
          <div>
            <strong>Numbers: </strong> {data.numbers.join(', ')}
          </div>
          <div>
            <strong>Words: </strong> {data.words.join(', ')}
          </div>
    
          <h2 className="p-2 border-2">Map</h2>
          <p>
            <strong>Operation:</strong> Multiply each number by 2
          </p>
          <div>
            <strong>Mapped Numbers: </strong> {mappedNumbers.join(', ')}
          </div>
    
          <h2 className="p-2 border-2">Filter</h2>
          <p>
            <strong>Operation:</strong> Filter out numbers less than 4
          </p>
          <div>
            <strong>Filtered Numbers: </strong> {filteredNumbers.join(', ')}
          </div>
    
          <h2 className="p-2 border-2">Reduce</h2>
          <p>
            <strong>Operation:</strong> Sum all numbers
          </p>
          <div>
            <strong>Sum of Numbers: </strong> {reducedSum}
          </div>
    
          <h2 className="p-2 border-2">Try it Yourself</h2>
          <div>
            <label>
              Modify Numbers (comma-separated):
              <input
                type="text"
                className="text-black w-full"
                value={data.numbers.join(', ')}
                onChange={(e) =>
                  setData({
                    ...data,
                    numbers: e.target.value.split(',').map(Number),
                  })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Modify Words (comma-separated):
              <input
                type="text"
                className="text-black w-full"
                value={data.words.join(', ')}
                onChange={(e) =>
                  setData({
                    ...data,
                    words: e.target.value.split(','),
                  })
                }
              />
            </label>
          </div>
        </div>
      );
    };
    
    export default MapReduceFilterDemo;
