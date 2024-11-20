// app/dataStructures.ts
import Link from 'next/link';
const dataStructures = [
    { name: 'Array', structure: 'array' },
    { name: 'Object', structure: 'object' },
    { name: 'Set', structure: 'set' },
    { name: 'Map', structure: 'map' },
    { name: 'Linked List', structure: 'linkedlist' }
    // Add more data structures as needed
];
export default function DataStructuresGrid() {
    console.log("foobar");
    return (<div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Data Structures</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {dataStructures.map((ds) => (<Link href={`/components/data-structures/${ds.structure}`} key={ds.structure}>
            <div className="p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition cursor-pointer">
              {ds.name}
            </div>
          </Link>))}
      </div>
    </div>);
}
