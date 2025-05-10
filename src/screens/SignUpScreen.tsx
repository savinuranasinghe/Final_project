import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import useTranslate from '../hooks/useTranslate';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES } from '../services/localizationService';

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', t('auth.fillAllFields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', t('auth.passwordsDoNotMatch'));
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigation will be handled by the auth state listener in App.tsx
    } catch (error: any) {
      let errorMessage = t('auth.signUpFailed');
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = t('auth.emailInUse');
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('auth.invalidEmail');
      } else if (error.code === 'auth/weak-password') {
        errorMessage = t('auth.weakPassword');
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

          <Text style={styles.title}>{t('auth.createAccount')}</Text>
          
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
            
            <TextInput
              style={styles.input}
              placeholder={t('auth.confirmPassword')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            
            <Button
              mode="contained"
              onPress={handleSignUp}
              loading={loading}
              disabled={loading}
              style={styles.button}
              buttonColor="#4CAF50"
            >
              {t('auth.signUpButton')}
            </Button>
            
            <TouchableOpacity 
              style={styles.linkContainer}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.link}>{t('auth.haveAccount')}</Text>
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

export default SignUpScreen;