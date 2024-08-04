'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

const protectedRoute = ({children}) => {
    const [user, loading] = useAuthState(auth)
    const router = useRouter()


useEffect(() => {
    if (typeof window !== 'undefined') { 
    if (!loading && !user) {
        router.push('/signin');
    }
}
}, [user, loading, router]);

    if (loading || !user) {
        return <div>Loading...</div>
    }
    return children;
}

export default protectedRoute;