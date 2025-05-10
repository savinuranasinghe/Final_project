import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../App';
import * as ImagePicker from 'expo-image-picker';
import useTranslate from '../hooks/useTranslate';

type CameraScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Camera'>;
  route: RouteProp<AppStackParamList, 'Camera'>;
};

const CameraScreen = ({ navigation, route }: CameraScreenProps) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { t } = useTranslate();

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log("Camera permission status:", status);
      setHasPermission(status === 'granted');
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      setHasPermission(false);
    }
  };

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        navigation.navigate('Result', { imageUri: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      Alert.alert(t('common.error'), t('cameraError'));
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        navigation.navigate('Result', { imageUri: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(t('common.error'), t('galleryError'));
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{t('common.requestingPermission')}</Text>
        <Button 
          mode="contained" 
          onPress={checkPermission}
          style={styles.button}
          buttonColor="#4CAF50"
        >
          {t('common.tryAgain')}
        </Button>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{t('common.permissionRequired')}</Text>
        <Button 
          mode="contained" 
          onPress={checkPermission}
          style={styles.button}
          buttonColor="#4CAF50"
          className="mb-4"
        >
          {t('common.grantPermission')}
        </Button>
        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()}
          style={styles.button}
          textColor="#4CAF50"
        >
          {t('common.goBack')}
        </Button>
      </SafeAreaView>
    );
  }

  // If we get here, we have camera permission
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraButtons}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.buttonText}>{t('common.takePicture')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
          <Text style={styles.buttonText}>{t('common.pickFromGallery')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>{t('common.backToHome')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 50,
    marginTop: 20,
    width: 250,
  },
  cameraButtons: {
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  galleryButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  backButton: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CameraScreen;