import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { analyzeLeafImage, getTreatmentRecommendations, getDiseaseDescriptions, PredictionResult } from '../services/mlService';

export const useImageAnalysis = (imageUri: string, currentLanguage: string, errorMessage: string, errorTitle: string) => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Analyzing image...");
      
      const predictionResult = await analyzeLeafImage(imageUri);
      console.log("Got prediction result:", predictionResult.disease);
      
      // Update the description based on current language
      const descriptions = getDiseaseDescriptions(currentLanguage);
      if (descriptions[predictionResult.disease as keyof typeof descriptions]) {
        predictionResult.description = descriptions[predictionResult.disease as keyof typeof descriptions];
      }
      
      setResult(predictionResult);
      
      // Get recommendations based on the detected disease and current language
      const treatmentRecs = getTreatmentRecommendations(predictionResult.disease, currentLanguage);
      setRecommendations(treatmentRecs);
    } catch (err: any) {
      console.error('Error analyzing image:', err);
      const errorMsg = errorMessage + ' ' + (err.message || '');
      setError(errorMsg);
      Alert.alert(errorTitle, errorMsg, [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  // Initial analysis
  useEffect(() => {
    analyzeImage();
  }, [imageUri]);

  // Update when language changes
  useEffect(() => {
    if (result && result.disease) {
      // Update recommendations for current language
      const treatmentRecs = getTreatmentRecommendations(result.disease, currentLanguage);
      setRecommendations(treatmentRecs);
      
      // Update description if available
      const descriptions = getDiseaseDescriptions(currentLanguage);
      if (descriptions[result.disease as keyof typeof descriptions]) {
        const updatedResult = {
          ...result,
          description: descriptions[result.disease as keyof typeof descriptions]
        };
        
        if (updatedResult.description !== result.description) {
          setResult(updatedResult);
        }
      }
    }
  }, [currentLanguage, result?.disease]);

  return {
    result,
    recommendations,
    loading,
    error,
    analyzeImage,
    setResult,
    setRecommendations,
    setLoading,
    setError
  };
};