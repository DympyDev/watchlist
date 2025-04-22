import { writable } from 'svelte/store';
import { auth, db } from '$lib/firebase/firebase.config';
import { GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const user = writable<User | null>(null);
export const isAuthenticated = writable(false);

// Listen to auth state changes
auth.onAuthStateChanged((userData) => {
    user.set(userData);
    isAuthenticated.set(!!userData);
});

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
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
    const MAX_RETRIES = 3;
    let retryCount = 0;

    while (retryCount < MAX_RETRIES) {
        try {
            const watchProgressRef = doc(db, 'users', userId, 'watchProgress', universe);
            
            // Save the watched items
            await setDoc(watchProgressRef, {
                items: watchedItems,
                updatedAt: new Date().toISOString()
            });
            
            return;
        } catch (error) {
            retryCount++;
            
            // If we've exhausted all retries, throw the error
            if (retryCount === MAX_RETRIES) {
                console.error('Error saving watched items after max retries:', error);
                throw error;
            }
            
            // Wait a bit before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 100));
        }
    }
}

export async function loadWatchedItems(userId: string, universe: string): Promise<string[]> {
    try {
        const watchProgressRef = doc(db, 'users', userId, 'watchProgress', universe);
        const docSnap = await getDoc(watchProgressRef);
        
        if (docSnap.exists()) {
            return docSnap.data().items || [];
        }
        return [];
    } catch (error) {
        console.error('Error loading watched items:', error);
        throw error;
    }
}
