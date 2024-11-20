'use client';
import { useState } from 'react';
export default function ObjectExample() {
    // Initial object
    const [person, setPerson] = useState({
        name: 'Alice',
        age: 25,
        email: 'alice@example.com',
    });
    // Function to update the name
    const updateName = () => {
        setPerson((prevPerson) => ({
            ...prevPerson,
            name: 'Bob',
        }));
    };
    // Function to update the age
    const updateAge = () => {
        setPerson((prevPerson) => ({
            ...prevPerson,
            age: prevPerson.age + 1,
        }));
    };
    // Function to reset the object to its initial state
    const resetPerson = () => {
        setPerson({
            name: 'Alice',
            age: 25,
            email: 'alice@example.com',
        });
    };
    return (<div>
      <h2>Object Example</h2>
      <p>Person Object: {JSON.stringify(person, null, 2)}</p>

      <div className="mt-4">
        <button onClick={updateName} className="bg-blue-500 text-white p-2 rounded mr-2">
          Change Name to Bob
        </button>
        <button onClick={updateAge} className="bg-green-500 text-white p-2 rounded mr-2">
          Increase Age
        </button>
        <button onClick={resetPerson} className="bg-red-500 text-white p-2 rounded">
          Reset
        </button>
      </div>
    </div>);
}
