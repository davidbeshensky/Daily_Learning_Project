// app/projects/data-structures/[structure]/page.tsx
import { notFound } from 'next/navigation';
import ArrayExample from '../../DataStructureExamples/ArrayExample';
import ObjectExample from '../../DataStructureExamples/ObjectExample';
// Import other examples as needed

const examples = {
  array: <ArrayExample />,
  object: <ObjectExample />,
  set: <p>Interactive Set Example</p>,
  map: <p>Interactive Map Example</p>,
  // Add other data structures here
};

interface ExamplePageProps {
  params: {
    structure: string;
  };
}

export default function ExamplePage({ params }: ExamplePageProps) {
  const { structure } = params;

  // Retrieve the example component
  const exampleComponent = examples[structure as keyof typeof examples];

  // Handle case where structure is not found
  if (!exampleComponent) {
    return notFound(); // Trigger 404 if the structure is invalid
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">{structure.toUpperCase()} Example</h1>
      {exampleComponent}
    </div>
  );
}
