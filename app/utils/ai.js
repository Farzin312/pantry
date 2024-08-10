import axios from 'axios';

const API_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = process.env.NEXT_PUBLIC_LLAMA_API_KEY;

export const generateRecipe = async (ingredients) => {
  console.log('Generating recipe with ingredients:', ingredients);

  try {
    const ingredientsArray = Array.isArray(ingredients) ? ingredients : [ingredients];

    const response = await axios.post(
      API_ENDPOINT,
      {
        model: 'llama3-8b-8192',  
        messages: [
          {
            role: 'user',
            content: `Please create a recipe with the following ingredients, and list the estimated calorie and nutrition facts: ${ingredientsArray.join(', ')}`
          }
        ],
        temperature: 1,  
        max_tokens: 1820, 
        top_p: 1,  
        stream: false, 
        stop: null  
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    const data = response.data;
    console.log('Received recipe data:', data);
    return data.choices[0].message.content;  
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw new Error('Failed to generate recipe');
  }
};
