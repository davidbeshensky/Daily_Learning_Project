// Import necessary types and Next.js functions
import { NextResponse } from 'next/server';

//const apiKey = 'VIpJPmCeja7wb8UvyO13'
const apiKey = process.env.NEXT_PUBLIC_LOTR_API_KEY;
console.log('LOTR API Key:', apiKey); // Add this line
// Function to fetch all characters
const fetchAllCharacters = async () => {
  const url = 'https://the-one-api.dev/v2/character';

  // Set up headers with the API key
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    // Fetch character data from The Lord of the Rings API
    const response = await fetch(url, { headers });
    
    // Check if response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    // Parse the JSON data
    const data = await response.json();
    
    // Return the character data
    return data.docs;
  } catch (error) {
    // Log the error and return an empty array
    console.error('Error fetching characters:', error);
    return [];
  }
};

// Define the GET route handler
export async function GET() {
  // Fetch the character data
  const characters = await fetchAllCharacters();
  
  // Return the character data in a JSON response
  return NextResponse.json(characters);
}
