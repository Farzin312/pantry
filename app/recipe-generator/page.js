'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { firestore } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import NavBar from '../components/NavBar';

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'pantry'));
        const ingredientsList = [];
        snapshot.forEach((doc) => {
          ingredientsList.push(doc.id);
        });
        setAvailableIngredients(ingredientsList);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleGenerateRecipe = async (ingredients) => {
    try {
      const result = await generateRecipe(ingredients);
      setRecipe(result);
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  const handleSearch = (query) => {
    const results = availableIngredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddIngredient = (ingredient) => {
    setIngredients((prev) => (prev ? `${prev}, ${ingredient}` : ingredient));
  };

  useEffect(() => {
    if (availableIngredients.length > 0) {
      handleGenerateRecipe(availableIngredients.join(', '));
    }
  }, [availableIngredients]);

  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{ gap: 4, textAlign: 'center', backgroundColor: 'transparent' }}
    >
      <NavBar handleLogout={() => router.push('/home')} hideRecipeGenerator />
      <Typography variant='h4' gutterBottom>
        Recipe Generator
      </Typography>
      <TextField
        label='Search for ingredients'
        variant='outlined'
        fullWidth
        onChange={(e) => handleSearch(e.target.value)}
        sx={{ maxWidth: '600px' }}
      />
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {searchResults.map((result, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handleAddIngredient(result)}
            sx={{ margin: 1 }}
          >
            {result}
          </Button>
        ))}
      </Stack>
      <Button
        variant='contained'
        onClick={() => handleGenerateRecipe(ingredients)}
        sx={{ backgroundColor: '#33292900', color: '#674B4B' }}
      >
        Generate Recipe
      </Button>
      {recipe && (
        <Box mt={4} sx={{ maxWidth: '600px' }}>
          <Typography variant='h5' gutterBottom>
            Generated Recipe
          </Typography>
          <Typography variant='body1'>{recipe}</Typography>
        </Box>
      )}
      <Button
        variant='outlined'
        onClick={() => router.push('/')}
        sx={{ color: '#674B4B' }}
      >
        Back to Inventory
      </Button>
    </Box>
  );
}
