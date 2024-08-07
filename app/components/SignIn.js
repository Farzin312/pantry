'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle, signInWithEmail } from '../utils/auth';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && user) {
      router.push('/'); 
    }
  }, [user, loading, router]);

  const handleEmailSignIn = async () => {
    try {
      const user = await signInWithEmail(email, password);
      if (user) {
        alert('Signed in successfully');
        router.push('/'); 
      }
    } catch (error) {
      alert('Error signing in via Email: ' + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle(); 
      if (user) {
        alert('Signed in Successfully');
        router.push('/'); 
      }
    } catch (error) {
      alert('Error signing in with Google: ' + error.message);
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
        Sign In
      </Typography>
      <Stack spacing={2} padding={2} sx={{ width: '100%', maxWidth: '500px' }}>
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
      <Stack spacing={2} padding={2} sx={{ width: '100%', maxWidth: '350px' }}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleEmailSignIn}
          fullWidth
          style={{ backgroundColor: '#33292900', color: '#674B4B' }}
        >
          Sign In with Email
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleGoogleSignIn}
          fullWidth
          style={{ backgroundColor: '#33292900', color: '#674B4B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src='/images/google-logo.png' alt='Google Logo' style={{ width: '20px', marginRight: '8px', borderRadius: '35%' }} />
          Sign In with Google
        </Button>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => router.push('/home')}
          fullWidth
          style={{ backgroundColor: '#33292900', color: '#674B4B' }}
        >
          Back to Home
        </Button>
      </Stack>
      </Box>
  );
}
