'use client';
import Link from 'next/link';
import { Box, Typography, Button } from '@mui/material';

export default function Home() {
  return (
    <Box
      width='100%'
      height='100vh'
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      sx={{
        gap: 4,
        textAlign: 'center',
        color: '#fff',
        padding: 4,
      }}
    >
      <Typography
        variant='h2'
        gutterBottom
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
          animation: 'fadeIn 2s',
        }}
      >
        Welcome to the Inventory Management App
      </Typography>
      <Typography
        variant='h5'
        gutterBottom
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '300',
          color: '#ffe',
          textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
          animation: 'fadeIn 3s',
        }}
      >
        This project is designed to help users manage their pantry inventory efficiently. Ideal for households and small businesses.
      </Typography>
      <Box display={'flex'} flexDirection={'row'} gap={2}>
        <Link href='/signin' passHref>
          <Button variant='contained' color='primary' sx={{ minWidth: '120px' }}>
            Sign In
          </Button>
        </Link>
        <Link href='/signup' passHref>
          <Button variant='contained' color='secondary' sx={{ minWidth: '120px' }}>
            Sign Up
          </Button>
        </Link>
      </Box>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
}
