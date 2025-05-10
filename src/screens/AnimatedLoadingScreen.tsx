import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  Animated, 
  Easing,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const AnimatedLoadingScreen = () => {
  // Rotation animation for the tomato
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Pulse animation for the tomato
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Progress bar animation
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Setup rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Setup pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      ])
    ).start();

    // Setup progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  // Calculate rotation based on animation value
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Calculate progress width based on animation value
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 80], // Account for padding
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [
              { rotate: spin },
              { scale: scaleAnim }
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/splash.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: progressWidth }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Green background
  },
  imageContainer: {
    marginBottom: 50,
  },
  image: {
    width: 150,
    height: 150,
  },
  progressBarContainer: {
    width: width - 80, // Account for padding
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default AnimatedLoadingScreen;