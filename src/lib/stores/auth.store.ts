import { writable } from 'svelte/store';
import { auth, db } from '$lib/firebase/firebase.config';
import { GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const user = writable<User | null>(null);
export const isAuthenticated = writable(false);

// Listen to auth state changes
auth.onAuthStateChanged((userData) => {
    user.set(userData);
    isAuthenticated.set(!!userData);
});

export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
    }
}

export async function signOutUser() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
}

export async function saveWatchedItems(userId: string, universe: string, watchedItems: string[]) {
    try {
        const userDoc = doc(db, 'users', userId);
        await setDoc(userDoc, {
            [`${universe}_watched`]: watchedItems
        }, { merge: true });
    } catch (error) {
        console.error('Error saving watched items:', error);
        throw error;
    }
}

export async function loadWatchedItems(userId: string, universe: string): Promise<string[]> {
    try {
        const userDoc = doc(db, 'users', userId);
        const docSnap = await getDoc(userDoc);
        
        if (docSnap.exists()) {
            return docSnap.data()[`${universe}_watched`] || [];
        }
        return [];
    } catch (error) {
        console.error('Error loading watched items:', error);
        throw error;
    }
} 