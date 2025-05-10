import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';
import { 
  onAuthStateChanged, 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import useTranslate from '../hooks/useTranslate';

// Define the type for our context
type AuthContextType = {
  user: User | null;
  loading: boolean;
  initialized: boolean; // New flag to track if auth is initialized
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  initialized: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const { t } = useTranslate();

  // Listen for auth state changes
  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setInitialized(true);
      console.log("Auth state changed:", currentUser ? "User logged in" : "No user");
    });

    // Cleanup function
    return () => {
      console.log("Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Attempting to sign in:", email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign in successful");
    } catch (error: any) {
      console.error('Sign in error:', error);
      let errorMessage = t('auth.signInFailed');
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = t('auth.invalidCredentials');
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('auth.invalidEmail');
      }
      
      Alert.alert('Error', errorMessage);
      setLoading(false);
      throw error;
    }
  };

  // Sign up with email/password
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Attempting to create account:", email);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account creation successful");
    } catch (error: any) {
      console.error('Sign up error:', error);
      let errorMessage = t('auth.signUpFailed');
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = t('auth.emailInUse');
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('auth.invalidEmail');
      } else if (error.code === 'auth/weak-password') {
        errorMessage = t('auth.weakPassword');
      }
      
      Alert.alert('Error', errorMessage);
      setLoading(false);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    setLoading(true);
    try {
      console.log("Attempting to sign out");
      await firebaseSignOut(auth);
      console.log("Sign out successful");
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', t('auth.logoutError'));
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        initialized,
        signIn, 
        signUp, 
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);