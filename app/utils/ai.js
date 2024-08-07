const API_ENDPOINT = 'https://api.example.com/llama';
const API_KEY = process.env.NEXT_PUBLIC_LLAMA_API_KEY;
;

export const generateRecipe = async (ingredients) => {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({ ingredients })
  });

  if (!response.ok) {
    throw new Error('Failed to generate recipe');
  }

  const data = await response.json();
  return data.recipe;
};
