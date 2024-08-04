'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpWithEmail } from '../utils/auth';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password);
      alert('Signed up successfully!');
      router.push('/signin'); 
    } catch (error) {
      alert('Error signing up: ' + error.message);
    }
  };

  return (
    <Box
      width='100%'
      height='100vh'
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      sx={{ gap: 2 }}
    >
      <Typography variant='h4' gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label='Email'
        variant='outlined'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label='Password'
        variant='outlined'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button variant='contained' color='primary' onClick={handleSignUp} fullWidth>
        Sign Up
      </Button>
    </Box>
  );
}
