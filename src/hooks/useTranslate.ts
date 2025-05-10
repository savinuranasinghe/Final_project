import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation, getLocalizedDiseaseName, getSeverityTranslationKey } from '../services/localizationService';
import { useEffect } from 'react';

/**
 * A hook that provides translation functions based on current language
 */
export const useTranslate = () => {
  const { currentLanguage } = useLanguage();
  
  // Debug language changes
  useEffect(() => {
    console.log('useTranslate - Current language:', currentLanguage);
  }, [currentLanguage]);
  
  /**
   * Translate a key to current language
   * @param key - The translation key (dot notation)
   * @returns The translated string
   */
  const t = (key: string): string => {
    const translation = getTranslation(key, currentLanguage);
    // Debug individual translations if needed
    // console.log(`Translating '${key}' to '${translation}' (${currentLanguage})`);
    return translation;
  };

  /**
   * Get the disease name in current language
   * @param diseaseId - The disease ID from the API
   * @returns The translated disease name
   */
  const translateDisease = (diseaseId: string): string => {
    return getLocalizedDiseaseName(diseaseId, currentLanguage);
  };

  /**
   * Get the severity level in current language
   * @param severity - The severity level ('Low', 'Medium', 'High', 'N/A')
   * @returns The translated severity level
   */
  const translateSeverity = (severity: string): string => {
    const key = getSeverityTranslationKey(severity);
    return getTranslation(key, currentLanguage);
  };

  return {
    t,
    translateDisease,
    translateSeverity,
    currentLanguage
  };
};

export default useTranslate;