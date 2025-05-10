import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import useTranslate from '../hooks/useTranslate';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES } from '../services/localizationService';

const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', t('auth.fillAllFields'));
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation will be handled by the auth state listener in App.tsx
    } catch (error: any) {
      let errorMessage = t('auth.signInFailed');
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = t('auth.invalidCredentials');
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('auth.invalidEmail');
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = async () => {
    try {
      const newLanguage = currentLanguage === LANGUAGES.ENGLISH 
        ? LANGUAGES.SINHALA 
        : LANGUAGES.ENGLISH;
      
      await changeLanguage(newLanguage);
    } catch (error) {
      console.error('Error toggling language:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/splash.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>{t('auth.signIn')}</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('auth.email')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder={t('auth.password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <Button
              mode="contained"
              onPress={handleSignIn}
              loading={loading}
              disabled={loading}
              style={styles.button}
              buttonColor="#4CAF50"
            >
              {t('auth.signInButton')}
            </Button>
            
            <TouchableOpacity 
              style={styles.linkContainer}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.link}>{t('auth.noAccount')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.languageToggle}
              onPress={toggleLanguage}
            >
              <Text style={styles.languageText}>{`${currentLanguage === LANGUAGES.ENGLISH ? 'English' : 'ඉංග්‍රීසි'} / ${currentLanguage === LANGUAGES.ENGLISH ? 'සිංහල' : 'Sinhala'}`}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#4CAF50',
    fontSize: 16,
  },
  languageToggle: {
    marginTop: 40,
    alignItems: 'center',
  },
  languageText: {
    color: '#4CAF50',
    fontSize: 16,
  }
});

export default SignInScreen;