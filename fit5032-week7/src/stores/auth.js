// src/stores/auth.js

import { defineStore } from 'pinia';
// Import the centralized, initialized auth and db instances
import { auth, db } from '../firebase'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,          // Firebase Authentication User object
    userProfile: null,   // User data from Firestore (including role)
    authIsReady: false, // Indicates if the initial auth state has been resolved
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.userProfile?.role === 'admin', // Use optional chaining for safety
    currentUserEmail: (state) => state.user?.email || '',
    currentUserRole: (state) => state.userProfile?.role || 'guest',
  },

  actions: {
    // Action to fetch user profile from Firestore
    async fetchUserProfile(uid) {
      const userDocRef = doc(db, 'users', uid);
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          this.userProfile = docSnap.data();
        } else {
          console.warn("No user profile found for UID:", uid, "Assigning default role.");
          // If profile doesn't exist, create one with a default role
          // This is a good fallback for users created before this system was in place
          const defaultProfile = { email: this.user.email, role: 'regularuser' };
          await setDoc(userDocRef, defaultProfile);
          this.userProfile = defaultProfile;
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        this.userProfile = null;
      }
    },

    // Action to handle user login
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // The onAuthStateChanged listener will automatically handle fetching the user profile
        return true;
      } catch (error) {
        this.user = null;
        this.userProfile = null;
        throw error; // Re-throw to be handled by the component
      }
    },

    // Action to handle user registration
    async register(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        // Immediately set user profile with the default role "regularuser"
        const newProfile = {
          email: newUser.email,
          role: "regularuser" // Set default role as requested
        };
        await setDoc(doc(db, "users", newUser.uid), newProfile);

        // Update the store state immediately after successful registration
        this.user = newUser;
        this.userProfile = newProfile;
        
        return true;
      } catch (error) {
        this.user = null;
        this.userProfile = null;
        throw error; // Re-throw to be handled by the component
      }
    },

    // Action to handle user logout
    async logout() {
      try {
        await signOut(auth);
        // The onAuthStateChanged listener will automatically clear the state
      } catch (error) {
        console.error("Firebase logout error:", error.message);
        throw error;
      }
    },

    // Action to initialize Firebase Auth listener
    // This is the single source of truth for auth state changes
    initializeAuthListener() {
      // Use a promise to let the router wait until the initial auth state is resolved
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.user = user;
            await this.fetchUserProfile(user.uid);
          } else {
            this.user = null;
            this.userProfile = null;
          }
          // Once the check is complete, mark auth as "ready"
          this.authIsReady = true;
          resolve();
        });
      });
    }
  },
})