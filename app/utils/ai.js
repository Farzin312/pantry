const API_ENDPOINT = 'https://api.groq.com/openai/v1/';
const API_KEY = process.env.NEXT_PUBLIC_LLAMA_API_KEY;

export const generateRecipe = async (ingredients) => {
  console.log('Generating recipe with ingredients:', ingredients);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ ingredients })
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Failed to generate recipe:', errorMessage);
      throw new Error('Failed to generate recipe');
    }

    const data = await response.json();
    console.log('Received recipe data:', data);
    return data.recipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
};
