'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle, signInWithEmail } from '../utils/auth';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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
      <Button variant='contained' color='primary' onClick={handleEmailSignIn} fullWidth>
        Sign In with Email
      </Button>
      <Button variant='contained' color='primary' onClick={handleGoogleSignIn} fullWidth>
        Sign In with Google
      </Button>
    </Box>
  );
}
