import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

// Language constants
export const LANGUAGES = {
  ENGLISH: 'en',
  SINHALA: 'si'
};

// Default language
export const DEFAULT_LANGUAGE = LANGUAGES.ENGLISH;

// Storage key for language preference
const LANGUAGE_STORAGE_KEY = 'user_language_preference';

// Translations for the app
export const translations = {
  [LANGUAGES.ENGLISH]: {
    // Common UI elements
    common: {
      takePicture: 'Take Photo',
      pickFromGallery: 'Choose from Gallery',
      backToHome: 'Back to Home',
      diseaseInfo: 'Disease Information',
      allDiseases: 'All Diseases',
      tryAgain: 'Try Again',
      loading: 'Loading...',
      analyzing: 'Analyzing leaf image...',
      error: 'Error',
      requestingPermission: 'Requesting camera permission...',
      permissionRequired: 'Camera access is required to detect diseases.',
      grantPermission: 'Grant Permission',
      goBack: 'Go Back',
      moreInfo: 'More Information',
      takeAnother: 'Take Another Photo',
      languageToggle: 'English / සිංහල',
      success: 'Success',
      cancel: 'Cancel',
      delete: 'Delete',
      viewHistory: 'View History',
    },

    // Home screen
    home: {
      title: 'Tomato Leaf Disease Detection',
      subtitle: 'Detect diseases in tomato plants using your camera',
      cameraButton: 'Take Photo',
      diseaseInfoButton: 'Disease Information',
      universityLabel: 'BSc Computer Science - Plymouth University',
    },

    // Result screen
    result: {
      detectionResult: 'Detection Result',
      confidence: 'Confidence',
      severity: 'Severity',
      description: 'Description',
      treatment: 'Treatment',
      prevention: 'Prevention',
      analysisError: 'Analysis Error',
      errorMessage: 'Failed to analyze the image. Please check your internet connection and try again.',
      healthy: 'Healthy',
      notTomatoLeaf: 'Not a Tomato Leaf',
      saveToHistory: 'Save to History',
      savedToHistory: 'Result saved to history',
      saveError: 'Failed to save result to history',
    },

    // Info screen
    info: {
      commonDiseases: 'Common Tomato Leaf Diseases',
      diseasesDescription: 'Tomato plants are susceptible to various diseases that can affect their leaves, stems, and fruits. Early detection and proper management are key to preventing crop losses.',
      diseasesList: 'Common Diseases:',
      tapForInfo: 'Tap for more information',
      causes: 'Causes',
      symptoms: 'Symptoms',
      management: 'Management',
      economicImpact: 'Economic Impact',
      scientificName: 'Scientific Name',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      createAccount: 'Create Account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signInButton: 'Sign In',
      signUpButton: 'Sign Up',
      noAccount: 'Don\'t have an account? Sign Up',
      haveAccount: 'Already have an account? Sign In',
      fillAllFields: 'Please fill in all fields',
      passwordsDoNotMatch: 'Passwords do not match',
      signInFailed: 'Failed to sign in',
      signUpFailed: 'Failed to sign up',
      invalidCredentials: 'Invalid email or password',
      emailInUse: 'Email is already in use',
      invalidEmail: 'Invalid email format',
      weakPassword: 'Password is too weak',
      logout: 'Log Out',
      logoutError: 'Failed to log out',
      signInWithGoogle: 'Sign in with Google',
      or: 'OR',
    },
    // Severity levels
    severity: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      na: 'N/A',
    },

    // Disease names
    diseases: {
      overview: 'Common Tomato Leaf Diseases',
      earlyBlight: 'Early Blight',
      lateBlight: 'Late Blight',
      septoriaLeafSpot: 'Septoria Leaf Spot',
      bacterialSpot: 'Bacterial Spot',
      leafMold: 'Leaf Mold',
      spiderMites: 'Spider Mites',
      targetSpot: 'Target Spot',
      yellowLeafCurl: 'Tomato Yellow Leaf Curl Virus',
      mosaicVirus: 'Tomato Mosaic Virus',
      powderyMildew: 'Powdery Mildew',
      healthy: 'Healthy',
      notTomatoLeaf: 'Not a Tomato Leaf',
    },
    history: {
      title: 'Detection History',
      noHistory: 'You have no saved detections. Take a photo to start detecting diseases!',
      date: 'Date',
      notes: 'Notes',
      deleteConfirmTitle: 'Delete Item',
      deleteConfirmMessage: 'Are you sure you want to delete this history item?',
      loadError: 'Failed to load history',
      deleteError: 'Failed to delete item',
    },
  },

  [LANGUAGES.SINHALA]: {
    // Common UI elements
    common: {
      takePicture: 'ඡායාරූපයක් ගන්න',
      pickFromGallery: 'ගැලරියෙන් තෝරන්න',
      backToHome: 'මුල් පිටුවට',
      diseaseInfo: 'රෝග තොරතුරු',
      allDiseases: 'සියලුම රෝග',
      tryAgain: 'නැවත උත්සාහ කරන්න',
      loading: 'පූරණය වෙමින්...',
      analyzing: 'කොළ පිළිබඳ විශ්ලේෂණය කරමින්...',
      error: 'දෝෂයකි',
      requestingPermission: 'කැමරා අවසරය ඉල්ලමින්...',
      permissionRequired: 'රෝග හඳුනා ගැනීමට කැමරා ප්‍රවේශය අවශ්‍ය වේ.',
      grantPermission: 'අවසරය ලබා දෙන්න',
      goBack: 'ආපසු යන්න',
      moreInfo: 'වැඩිදුර තොරතුරු',
      takeAnother: 'තවත් ඡායාරූපයක් ගන්න',
      languageToggle: 'English / සිංහල',
      success: 'සාර්ථකයි',
      cancel: 'අවලංගු කරන්න',
      delete: 'මකන්න',
      viewHistory: 'ඉතිහාසය බලන්න',

    },

    // Home screen
    home: {
      title: 'තක්කාලි කොළ රෝග හඳුනා ගැනීම',
      subtitle: 'ඔබගේ කැමරාව භාවිතයෙන් තක්කාලි ශාකවල රෝග හඳුනා ගන්න',
      cameraButton: 'ඡායාරූපයක් ගන්න',
      diseaseInfoButton: 'රෝග තොරතුරු',
      universityLabel: 'BSc පරිගණක විද්‍යාව - ප්ලයිමත් විශ්ව විද්‍යාලය',
    },

    // Result screen
    result: {
      detectionResult: 'හඳුනාගැනීමේ ප්‍රතිඵලය',
      confidence: 'විශ්වාසනීයත්වය',
      severity: 'බරපතලකම',
      description: 'විස්තරය',
      treatment: 'ප්‍රතිකාර',
      prevention: 'වැළැක්වීම',
      analysisError: 'විශ්ලේෂණ දෝෂය',
      errorMessage: 'රූපය විශ්ලේෂණය කිරීමට අසමත් විය. කරුණාකර ඔබගේ අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කර නැවත උත්සාහ කරන්න.',
      healthy: 'සෞඛ්‍ය සම්පන්න',
      notTomatoLeaf: 'තක්කාලි කොළයක් නොවේ',
      saveToHistory: 'ඉතිහාසයට සුරකින්න',
      savedToHistory: 'ප්‍රතිඵලය ඉතිහාසයට සුරැකිණි',
      saveError: 'ප්‍රතිඵලය ඉතිහාසයට සුරැකීමට අසමත් විය',
    },
    auth: {
      signIn: 'පුරන්න',
      signUp: 'ලියාපදිංචි වන්න',
      createAccount: 'ගිණුමක් සාදන්න',
      email: 'විද්‍යුත් තැපෑල',
      password: 'මුරපදය',
      confirmPassword: 'මුරපදය තහවුරු කරන්න',
      signInButton: 'පුරන්න',
      signUpButton: 'ලියාපදිංචි වන්න',
      noAccount: 'ගිණුමක් නැද්ද? ලියාපදිංචි වන්න',
      haveAccount: 'දැනටමත් ගිණුමක් තිබේද? පුරන්න',
      fillAllFields: 'කරුණාකර සියලු ක්ෂේත්‍ර පුරවන්න',
      passwordsDoNotMatch: 'මුරපද නොගැලපේ',
      signInFailed: 'පිවිසීමට අසමත් විය',
      signUpFailed: 'ලියාපදිංචි වීමට අසමත් විය',
      invalidCredentials: 'අවලංගු විද්‍යුත් තැපෑල හෝ මුරපදය',
      emailInUse: 'විද්‍යුත් තැපෑල දැනටමත් භාවිතා කර ඇත',
      invalidEmail: 'අවලංගු විද්‍යුත් තැපැල් ආකෘතිය',
      weakPassword: 'මුරපදය දුර්වලයි',
      logout: 'පිටවීම',
      logoutError: 'පිටවීමට අසමත් විය',
      signInWithGoogle: 'ගූගල් සමඟ පුරන්න',
      or: 'හෝ',
    },

    // Info screen
    info: {
      commonDiseases: 'සාමාන්‍ය තක්කාලි කොළ රෝග',
      diseasesDescription: 'තක්කාලි ශාක විවිධ රෝගවලට ලක්විය හැකි අතර, එය කොළ, කඳන් සහ පලතුරු වලට බලපෑම් ඇති කරයි. කල්තියා හඳුනාගැනීම සහ නිසි කළමනාකරණය අස්වැන්න අහිමි වීම වැළැක්වීම සඳහා යතුරකි.',
      diseasesList: 'සාමාන්‍ය රෝග:',
      tapForInfo: 'වැඩි විස්තර සඳහා තට්ටු කරන්න',
      causes: 'හේතු',
      symptoms: 'රෝග ලක්ෂණ',
      management: 'කළමනාකරණය',
      economicImpact: 'ආර්ථික බලපෑම',
      scientificName: 'විද්‍යාත්මක නාමය',
    },

    // Severity levels
    severity: {
      low: 'අඩු',
      medium: 'මධ්‍යම',
      high: 'ඉහළ',
      na: 'අදාළ නොවේ',
    },

    // Disease names
    diseases: {
      overview: 'සාමාන්‍ය තක්කාලි කොළ රෝග',
      earlyBlight: 'පෙරළිත රෝගය',
      lateBlight: 'පශ්චිමාංගමාරය',
      septoriaLeafSpot: 'සෙප්ටෝරියා පත්‍ර ලප',
      bacterialSpot: 'බැක්ටීරියා තිත්',
      leafMold: 'පත්‍ර පූස්',
      spiderMites: 'මකුළු මයිට්',
      targetSpot: 'ඉලක්ක ලප',
      yellowLeafCurl: 'තක්කාලි කහ පත්‍ර කැරලි වෛරසය',
      mosaicVirus: 'තක්කාලි මොසෙයික් වෛරසය',
      powderyMildew: 'පිටි පස් රෝගය',
      healthy: 'සෞඛ්‍ය සම්පන්න',
      notTomatoLeaf: 'තක්කාලි කොළයක් නොවේ',
    },
    history: {
      title: 'හඳුනා ගැනීමේ ඉතිහාසය',
      noHistory: 'ඔබට සුරකින ලද හඳුනා ගැනීම් නැත. රෝග හඳුනා ගැනීම ආරම්භ කිරීමට ඡායාරූපයක් ගන්න!',
      date: 'දිනය',
      notes: 'සටහන්',
      deleteConfirmTitle: 'අයිතමය මකන්න',
      deleteConfirmMessage: 'ඔබට මෙම ඉතිහාස අයිතමය මැකීමට අවශ්‍ය ද?',
      loadError: 'ඉතිහාසය පූරණය කිරීමට අසමත් විය',
      deleteError: 'අයිතමය මැකීමට අසමත් විය',
    },
  }
};

/**
 * Gets translation for a given key path (e.g., 'common.takePicture')
 * @param key - Dot notation path to translation
 * @param language - Language code
 * @returns The translated string
 */
export const getTranslation = (key: string, language: string = DEFAULT_LANGUAGE): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key doesn't exist in current language
      let fallbackValue: any = translations[DEFAULT_LANGUAGE];
      for (const fallbackKey of keys) {
        if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
          fallbackValue = fallbackValue[fallbackKey];
        } else {
          return key; // Return the key itself if translation not found
        }
      }
      return fallbackValue as string;
    }
  }
  
  return value as string;
};

/**
 * A hook-friendly function to get translation
 * Usage: const t = useTranslation(currentLanguage);
 * Then use: t('common.takePicture')
 */
export const useTranslation = (language: string) => {
  return (key: string) => getTranslation(key, language);
};

/**
 * Saves user's language preference to AsyncStorage
 */
export const saveLanguagePreference = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
};

/**
 * Retrieves user's language preference from AsyncStorage
 * Returns default language if no preference is found
 */
export const getLanguagePreference = async (): Promise<string> => {
  try {
    const language = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return language || DEFAULT_LANGUAGE;
  } catch (error) {
    console.error('Error getting language preference:', error);
    return DEFAULT_LANGUAGE;
  }
};

/**
 * Converts disease ID from API to translation key
 */
export const getDiseaseTranslationKey = (diseaseId: string): string => {
  const mapping: {[key: string]: string} = {
    'Bacterial_spot': 'diseases.bacterialSpot',
    'Early_blight': 'diseases.earlyBlight',
    'Late_blight': 'diseases.lateBlight',
    'Leaf_Mold': 'diseases.leafMold',
    'Septoria_leaf_spot': 'diseases.septoriaLeafSpot',
    'Spider_mites Two-spotted_spider_mite': 'diseases.spiderMites',
    'Target_Spot': 'diseases.targetSpot',
    'Tomato_Yellow_Leaf_Curl_Virus': 'diseases.yellowLeafCurl',
    'Tomato_mosaic_virus': 'diseases.mosaicVirus',
    'powdery_mildew': 'diseases.powderyMildew',
    'healthy': 'diseases.healthy',
    'not_tomato_leaf': 'diseases.notTomatoLeaf'
  };

  return mapping[diseaseId] || 'diseases.overview';
};

/**
 * Converts severity level to translation key
 */
export const getSeverityTranslationKey = (severity: string): string => {
  const mapping: {[key: string]: string} = {
    'Low': 'severity.low',
    'Medium': 'severity.medium',
    'High': 'severity.high',
    'N/A': 'severity.na'
  };

  return mapping[severity] || 'severity.na';
};

/**
 * Get disease name in current language from disease ID
 */
export const getLocalizedDiseaseName = (diseaseId: string, language: string): string => {
  const translationKey = getDiseaseTranslationKey(diseaseId);
  return getTranslation(translationKey, language);
};