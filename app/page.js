'use client'
import Layout from './components/Layout';
import Inventory from './components/Inventory';
import ProtectedRoute from './components/ProtectedRoute';

export default function Home() {
  return (
    <Layout>
      <ProtectedRoute>
        <Inventory />
      </ProtectedRoute>
    </Layout>
  );
}

