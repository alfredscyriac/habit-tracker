// The purpose of this file is that it is a single source of truth for authentication state and actions

import React, { createContext, useContext, useEffect, useState } from "react"; 
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { auth } from "../firebase";

// 1. Create the context object. This object holds auth data and methods 
const AuthContext = createContext();

// 2.  Custom hook to make consuming the AuthContext easier
// Instead of useContext(AuthContext) everywhere, we’ll call useAuth()
export function useAuth() {
    return useContext(AuthContext);
}

// 3. The Provider component that wraps our app and makes auth available
// We’ll wrap <App/> in this provider (in index.js)
export function AuthProvider({children}) {
    // Holds the currently signed‑in user object (or null if not signed in)
    const [currentUser, setCurrentUser] = useState(null);
    
    // Tracks whether we’re waiting for Firebase to initialize the auth state
    // We don’t render our app until we know if there’s a user or not 
    const [loading, setLoading] = useState(true); 

    // Wrap some firebase functions to make them simpler to call like in step 2
    function signup(email,password) {
        return createUserWithEmailAndPassword(auth,email,password); 
    }

    function login(email,password) {
        return signInWithEmailAndPassword(auth,email,password); 
    }

    function logout() {
        return signOut(auth); 
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user); 
            setLoading(false); 
        });
        return unsubscribe; 
    }, []); 

    const value = { currentUser, signup, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {/* only render children once we know loading is false */}
            {!loading && children}
        </AuthContext.Provider>
    );
}