// src/utils/diseaseUtils.ts
import { LANGUAGES } from '../services/localizationService';

// Map API disease names to display names
export const mapApiDiseaseToDisplayName = (apiDiseaseName: string): string => {
  const diseaseInfoMapping: {[key: string]: string} = {
    'Bacterial_spot': 'Bacterial Spot',
    'Early_blight': 'Early Blight',
    'Late_blight': 'Late Blight',
    'Leaf_Mold': 'Leaf Mold',
    'Septoria_leaf_spot': 'Septoria Leaf Spot',
    'Spider_mites Two-spotted_spider_mite': 'Spider Mites',
    'Target_Spot': 'Target Spot',
    'Tomato_Yellow_Leaf_Curl_Virus': 'Tomato Yellow Leaf Curl Virus',
    'Tomato_mosaic_virus': 'Tomato Mosaic Virus',
    'powdery_mildew': 'Powdery Mildew',
    'healthy': 'overview'
  };
  
  return diseaseInfoMapping[apiDiseaseName] || 'overview';
};

// Map disease names between English and Sinhala
export const mapDiseaseNameToLanguageKey = (diseaseName: string, language: string): string => {
  if (language === LANGUAGES.SINHALA) {
    const sinhalaMapping: {[key: string]: string} = {
      'Bacterial Spot': 'බැක්ටීරියා තිත්',
      'Early Blight': 'පෙරළිත රෝගය',
      'Late Blight': 'පශ්චිමාංගමාරය',
      'Leaf Mold': 'පත්‍ර පූස්',
      'Septoria Leaf Spot': 'සෙප්ටෝරියා පත්‍ර ලප',
      'Spider Mites': 'මකුළු මයිට්',
      'Target Spot': 'ඉලක්ක ලප',
      'Tomato Yellow Leaf Curl Virus': 'තක්කාලි කහ පත්‍ර කැරලි වෛරසය',
      'Tomato Mosaic Virus': 'තක්කාලි මොසෙයික් වෛරසය',
      'Powdery Mildew': 'පිටි පස් රෝගය',
      'overview': 'overview'
    };
    return sinhalaMapping[diseaseName] || 'overview';
  }
  
  return diseaseName; // Return as-is for English
};

// Helper functions for colors
export const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return '#2e7d32'; // Green for high confidence
  if (confidence >= 75) return '#f9a825'; // Yellow for medium confidence
  return '#c62828'; // Red for low confidence
};

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Low': return '#2e7d32';
    case 'Medium': return '#f9a825';
    case 'High': return '#c62828';
    default: return '#757575';
  }
};