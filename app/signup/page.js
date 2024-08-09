'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import SignUp from '../components/SignUp';

export default function SignInPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/inventory');  
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <SignUp />  
  );
}
