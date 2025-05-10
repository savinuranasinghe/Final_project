import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES } from '../services/localizationService';
import useTranslate from '../hooks/useTranslate';
import { signOut } from 'firebase/auth'; // Add this import
import { auth } from '../services/firebaseConfig'; // Add this import

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { changeLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslate();
  
  // Log current language on component mount and when it changes
  useEffect(() => {
    console.log('HomeScreen - Current language:', currentLanguage);
  }, [currentLanguage]);
  
  const toggleLanguage = async () => {
    try {
      const newLanguage = currentLanguage === LANGUAGES.ENGLISH 
        ? LANGUAGES.SINHALA 
        : LANGUAGES.ENGLISH;
      
      console.log('Toggling language from', currentLanguage, 'to', newLanguage);
      await changeLanguage(newLanguage);
      console.log('Language changed successfully to', newLanguage);
      
      // Force update UI by showing a small notification
      const message = newLanguage === LANGUAGES.ENGLISH 
        ? 'Language changed to English' 
        : 'භාෂාව සිංහල බවට වෙනස් කරන ලදී';
      
      // Optional: Show feedback to user
      // Alert.alert('', message, [{ text: 'OK' }]);
    } catch (error) {
      console.error('Error toggling language:', error);
    }
  };

  // Add this function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      // Navigation will be handled by the auth state listener in App.tsx
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert(t('common.error'), t('auth.logoutError'));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#4CAF50"
      />

      <ScrollView contentContainerStyle={{ 
        flexGrow: 1,
        alignItems: 'center', 
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 30
      }}>
        <Image
          source={require('../assets/splash.png')}
          style={{ width: 150, height: 150, marginBottom: 20 }}
          resizeMode="contain"
        />

        <Text style={{ 
          fontSize: 22, 
          fontWeight: 'bold', 
          textAlign: 'center',
          color: '#2e7d32',
          marginBottom: 10
        }}>
          {t('home.title')}
        </Text>

        <Text style={{ 
          fontSize: 16, 
          textAlign: 'center', 
          color: '#666',
          marginBottom: 30
        }}>
          {t('home.subtitle')}
        </Text>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Camera')}
          style={{ 
            marginBottom: 16,
            width: '100%'
          }}
          buttonColor="#4CAF50"
          icon="camera"
        >
          {t('home.cameraButton')}
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Info', { disease: 'overview' })}
          style={{ 
            width: '100%',
            marginBottom: 16
          }}
          textColor="#4CAF50"
          icon="information-outline"
        >
          {t('common.diseaseInfo')}
        </Button>

        {/* History Button */}
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('History')}
          style={{ 
            width: '100%',
            marginBottom: 16
          }}
          textColor="#4CAF50"
          icon="history"
        >
          {t('common.viewHistory')}
        </Button>

        {/* Add Logout Button */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={{ 
            width: '100%',
            marginBottom: 16
          }}
          textColor="#4CAF50"
          icon="logout"
        >
          {t('auth.logout')}
        </Button>

        <View style={{ flex: 1 }} />

        <Text style={{ 
          marginBottom: 16,
          fontSize: 12, 
          color: '#888',
          textAlign: 'center'
        }}>
          {t('home.universityLabel')}
        </Text>

        <Button
          mode="text"
          onPress={toggleLanguage}
          contentStyle={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          textColor="#4CAF50"
          icon="translate"
        >
          {`${currentLanguage === LANGUAGES.ENGLISH ? 'English' : 'ඉංග්‍රීසි'} / ${currentLanguage === LANGUAGES.ENGLISH ? 'සිංහල' : 'Sinhala'}`}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;