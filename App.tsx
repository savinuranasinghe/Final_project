import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import ResultScreen from './src/screens/ResultScreen';
import InfoScreen from './src/screens/InfoScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import AnimatedLoadingScreen from './src/screens/AnimatedLoadingScreen';


type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: { imageUri: string };
  Info: { disease: string };
  History: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

// Auth navigation when user is not logged in
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false, // Hide the navigation header for auth screens
      contentStyle: {
        backgroundColor: '#f5f5f5',
      }
    }}
  >
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

// App navigation when user is logged in
const AppNavigator = () => (
  <AppStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#4CAF50',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center', // Center the header title
    }}
  >
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="Camera" component={CameraScreen} />
    <AppStack.Screen name="Result" component={ResultScreen} />
    <AppStack.Screen name="Info" component={InfoScreen} />
    <AppStack.Screen name="History" component={HistoryScreen} />
  </AppStack.Navigator>
);

// This component decides which navigator to render based on auth state
const RootNavigator = () => {
  const { user, loading } = useAuth();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Show loading screen for a minimum time to ensure the animation is visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000); // Minimum 3 seconds loading screen
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading || isInitialLoading) {
    return <AnimatedLoadingScreen />;
  }
  
  return user ? <AppNavigator /> : <AuthNavigator />;
};

// Main App component
export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </LanguageProvider>
  );
}