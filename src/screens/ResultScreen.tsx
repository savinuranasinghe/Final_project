import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../App';
import useTranslate from '../hooks/useTranslate';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { mapApiDiseaseToDisplayName, mapDiseaseNameToLanguageKey } from '../utils/diseaseUtils';
import { saveToHistory } from '../services/historyService';
import ResultImageCard from 'components/result/ResultImageCard';
import LoadingView from 'components/result/LoadingView';
import ErrorView from 'components/result/ErrorView';
import ResultDetailsCard from 'components/result/ResultDetailsCard';
import ActionButtons from 'components/result/ActionButtons';

type ResultScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Result'>;
  route: RouteProp<AppStackParamList, 'Result'>;
};

const ResultScreen = ({ navigation, route }: ResultScreenProps) => {
  const { imageUri } = route.params;
  const { t, translateDisease, translateSeverity, currentLanguage } = useTranslate();
  
  const { 
    result, 
    recommendations, 
    loading, 
    error, 
    analyzeImage,
    setLoading,
    setError
  } = useImageAnalysis(
    imageUri, 
    currentLanguage, 
    t('result.errorMessage'),
    t('common.error')
  );

  // Auto-save to history when we get a result
  useEffect(() => {
    const autoSaveToHistory = async () => {
      if (result && !loading && !error && result.disease !== 'not_tomato_leaf') {
        try {
          await saveToHistory(
            imageUri,
            result.disease,
            result.confidence,
            result.severity || 'N/A'
          );
          console.log('Result automatically saved to history');
        } catch (err) {
          console.error('Error auto-saving to history:', err);
          // We don't show an alert for auto-save errors to avoid interrupting the user experience
        }
      }
    };
    
    autoSaveToHistory();
  }, [result, loading, error, imageUri]);

  const handleMoreInfoPress = () => {
    if (result && result.disease !== 'not_tomato_leaf') {
      // Get the English disease name first
      const englishDiseaseName = mapApiDiseaseToDisplayName(result.disease);
      
      // If in Sinhala mode, map to Sinhala disease name
      const mappedDiseaseName = mapDiseaseNameToLanguageKey(englishDiseaseName, currentLanguage);
      
      navigation.navigate('Info', { disease: mappedDiseaseName });
    } else {
      navigation.navigate('Info', { disease: 'overview' });
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    analyzeImage();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ResultImageCard imageUri={imageUri} />

        {loading ? (
          <LoadingView message={t('common.analyzing')} />
        ) : error ? (
          <ErrorView 
            title={t('result.analysisError')}
            message={error}
            onTakeAnother={() => navigation.navigate('Camera')}
            onRetry={handleRetry}
            takeAnotherLabel={t('common.takeAnother')}
            retryLabel={t('common.tryAgain')}
          />
        ) : (
          <>
            <ResultDetailsCard 
              result={result}
              recommendations={recommendations}
              titleLabel={t('result.detectionResult')}
              confidenceLabel={t('result.confidence')}
              severityLabel={t('result.severity')}
              descriptionLabel={t('result.description')}
              treatmentLabel={t('result.treatment')}
              preventionLabel={t('result.prevention')}
              translateDisease={translateDisease}
              translateSeverity={translateSeverity}
            />

            <ActionButtons 
              showMoreInfo={!!(result && result.disease !== 'not_tomato_leaf')}
              onMoreInfo={handleMoreInfoPress}
              onTakeAnother={() => navigation.navigate('Camera')}
              onHome={() => navigation.navigate('Home')}
              imageUri={imageUri}
              result={result}
              moreInfoLabel={t('common.moreInfo')}
              saveToHistoryLabel={t('result.saveToHistory')}
              takeAnotherLabel={t('common.takeAnother')}
              viewHistoryLabel={t('common.viewHistory')}
              homeLabel={t('common.backToHome')}
              navigation={navigation}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  }
});

export default ResultScreen;