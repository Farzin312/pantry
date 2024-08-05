import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch(error) {
        console.error('Error signing in with Goggle', error);
        throw error;
    }
};

export const signUpWithEmail = async (email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        return result.user;
    } catch(error) {
        console.error('Error singing up with email', error)
        throw error;
    }
};

export const signInWithEmail = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        return result.user;
    } catch(error) {
        console.error('Error singing in with email', error)
        throw error;
    }
};

export const logOut = async () => {
    try {
        await signOut(auth)
    } catch(error) {
        console.error('Error logging out', error);
        throw error;
    }
};

