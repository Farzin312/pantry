'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signUpWithEmail } from '../utils/auth';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && user) {
      router.push('/'); 
    }
  }, [user, loading, router]);

  const handleSignUp = async () => {
    try {
      const user = await signUpWithEmail(email, password);
      if (user) {
        alert('Signed up successfully!');
        router.push('/signin'); 
      }
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
      <Stack spacing={2} padding={2} sx={{width:'100%', maxWidth:'500px'}}>
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
      </Stack>
      <Stack spacing={2} padding={2} sx={{width:'100%', maxWidth:'350px'}}>
      <Button variant='contained' color='primary' onClick={handleSignUp} fullWidth style={{ backgroundColor: '#33292900', color: '#674B4B' }}>
        Sign Up
      </Button>
      <Button variant='outlined' onClick={() => router.push('/home')} fullWidth style={{ backgroundColor: '#33292900', color: '#674B4B' }}>
        Back to Home
      </Button>
      </Stack>
    </Box>
  );
}
