import React from 'react';

export default function AwesomeIdeas() {
  // List of ideas to implement
  const ideas = [
    'adjust the header system to sort pages into drop down menus based on where they exist in the heirarchy',
    'build a song visualizer'
  ];

  // List of completed ideas
  const completedIdeas = [
    'Create an application to house all my little projects',
    'add a couple of starter projects'
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Next Project</h1>
      <p className="mb-4">Here are some ideas I'd like to implement:</p>

      <h2 className="text-xl font-semibold mb-2">Pending Ideas</h2>
      <ul className="list-disc pl-6 space-y-2">
        {ideas.map((idea, index) => (
          <li key={index} className="text-lg">{idea}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Completed Ideas</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-500">
        {completedIdeas.map((idea, index) => (
          <li key={index} className="text-lg line-through">{idea}</li>
        ))}
      </ul>
    </div>
  );
}
