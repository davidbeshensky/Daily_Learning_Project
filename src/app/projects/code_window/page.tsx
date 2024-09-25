"use client";

import React, { useState } from "react";

const CodeRunner: React.FC = () => {
  const [code, setCode] = useState(`
const Array = [1,2,3,4,5,6];

const printArray = (array) => \`heres the array, \${array}\`;
printArray(Array);

//const greeting = (name) => \`Hello, \${name}!\`;
//greeting("Alice");
  `);

  const [output, setOutput] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const runCode = () => {
    setError(null);
    setConsoleLogs([]);

    const logs: string[] = [];

    //capture console.log output
    const originalConsoleLog = console.log;
    console.log = (...args: any[]) => {
      logs.push(args.join(" "));
    };

    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      setOutput(result ? result.toString() : "No output");
    } catch (err: any) {
      setOutput(err.message);
    } finally {
      //restore the OG console.log
      console.log = originalConsoleLog;
      setConsoleLogs(logs);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-300 border border-gray-300 rounded-lg text-gray-700">
      <h2 className="text-lg font-bold mb-4">
        JavaScript/TypeScript Playground
      </h2>

      {/* Code input */}
      <textarea
        className="w-full h-40 p-2 mb-4 text-sm bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 "
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Type your JavaScript/TypeScript code here..."
      />

      {/* Run button */}
      <button
        className="w-24 p-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        onClick={runCode}
      >
        Run
      </button>

      {/* Output area */}
      <div className="p-2 bg-gray-100 border border-gray-400 rounded-md">
        <h3 className="font-semibold mb-2">Output:</h3>
        <pre className="whitespace-pre-wrap text-sm">{output}</pre>
      </div>

      {/* Console Logs Output */}
      {consoleLogs.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 text-gray-800 border border-gray-400 rounded">
          <strong>Console Logs:</strong>
          <pre className="mt-2">{consoleLogs.join("\n")}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeRunner;
