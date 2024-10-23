'use client'

import { useEffect, useState } from 'react';

interface Character {
  _id: string;
  name: string;
  race: string;
}

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API route when the component mounts
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/the-one-api');
        
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }

        const data = await response.json();
        setCharacters(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      }
    }

    fetchCharacters();
  }, []);

  if (loading) {
    return <p>Loading characters...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Lord of the Rings Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character._id}>
            <strong>{character.name}</strong> - {character.race}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
