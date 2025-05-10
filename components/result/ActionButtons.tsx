// src/components/result/ActionButtons.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { saveToHistory } from '../../src/services/historyService';

type ActionButtonsProps = {
  showMoreInfo: boolean;
  onMoreInfo: () => void;
  onTakeAnother: () => void;
  onHome: () => void;
  imageUri?: string;
  result?: any;
  moreInfoLabel: string;
  saveToHistoryLabel?: string;
  viewHistoryLabel?: string;
  takeAnotherLabel: string;
  homeLabel: string;
  navigation?: any;
};

const ActionButtons = ({
  showMoreInfo,
  onMoreInfo,
  onTakeAnother,
  onHome,
  imageUri,
  result,
  moreInfoLabel,
  saveToHistoryLabel,
  viewHistoryLabel,
  takeAnotherLabel,
  homeLabel,
  navigation
}: ActionButtonsProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToHistory = async () => {
    if (!result || !imageUri) return;
    
    try {
      setIsSaving(true);
      await saveToHistory(
        imageUri,
        result.disease,
        result.confidence,
        result.severity || 'N/A'
      );
      console.log('Result saved to history');
      Alert.alert('Success', 'Result saved to history');
    } catch (error) {
      console.error('Error saving to history:', error);
      Alert.alert('Error', 'Failed to save result to history');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      {showMoreInfo && (
        <Button
          mode="contained"
          icon="information-outline"
          onPress={onMoreInfo}
          style={styles.button}
          buttonColor="#4CAF50"
        >
          {moreInfoLabel}
        </Button>
      )}
      
      {result && imageUri && saveToHistoryLabel && result.disease !== 'not_tomato_leaf' && (
        <Button
          mode="contained"
          icon="content-save"
          onPress={handleSaveToHistory}
          style={styles.button}
          buttonColor="#4CAF50"
          loading={isSaving}
          disabled={isSaving}
        >
          {saveToHistoryLabel}
        </Button>
      )}
      
      <Button
        mode="outlined"
        icon="camera"
        onPress={onTakeAnother}
        style={styles.button}
        textColor="#4CAF50"
      >
        {takeAnotherLabel}
      </Button>
      
      {viewHistoryLabel && navigation && (
        <Button
          mode="outlined"
          icon="history"
          onPress={() => navigation.navigate('History')}
          style={styles.button}
          textColor="#4CAF50"
        >
          {viewHistoryLabel}
        </Button>
      )}
      
      <Button
        mode="text"
        icon="home"
        onPress={onHome}
        style={styles.button}
        textColor="#4CAF50"
      >
        {homeLabel}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 8,
  },
});

export default ActionButtons;