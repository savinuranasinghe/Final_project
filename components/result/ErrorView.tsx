import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type ErrorViewProps = {
  title: string;
  message: string;
  onTakeAnother: () => void;
  onRetry: () => void;
  takeAnotherLabel: string;
  retryLabel: string;
};

const ErrorView = ({ 
  title, 
  message, 
  onTakeAnother, 
  onRetry,
  takeAnotherLabel,
  retryLabel
}: ErrorViewProps) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>{title}</Text>
      <Text style={styles.errorText}>{message}</Text>
      <View style={styles.errorActions}>
        <Button
          mode="contained"
          icon="camera"
          onPress={onTakeAnother}
          style={styles.button}
          buttonColor="#4CAF50"
        >
          {takeAnotherLabel}
        </Button>
        
        <Button
          mode="outlined"
          icon="refresh"
          onPress={onRetry}
          style={[styles.button, {marginTop: 8}]}
          textColor="#4CAF50"
        >
          {retryLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginVertical: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c62828',
    marginBottom: 8,
  },
  errorText: {
    color: '#c62828',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  errorActions: {
    width: '100%',
  },
  button: {
    marginVertical: 8,
  },
});

export default ErrorView;