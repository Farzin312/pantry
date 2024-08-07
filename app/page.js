'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import Layout from './components/Layout';
import Inventory from './components/Inventory';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './home/page';
import RecipeGenerator from './recipe-generator/page'; 

export default function Page() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/home'); 
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Home />; 
  }

  return (
    <Layout>
      <ProtectedRoute>
        <Inventory />
        <RecipeGenerator />
      </ProtectedRoute>
    </Layout>
  );
}
