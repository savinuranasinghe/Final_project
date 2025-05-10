import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getLanguagePreference, saveLanguagePreference, LANGUAGES, DEFAULT_LANGUAGE } from '../services/localizationService';

type LanguageContextType = {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  isLoading: boolean;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: DEFAULT_LANGUAGE,
  changeLanguage: async () => {},
  isLoading: true,
});

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load saved language preference on app start
  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLanguage = await getLanguagePreference();
        setCurrentLanguage(savedLanguage);
      } catch (error) {
        console.error('Failed to load language preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguagePreference();
  }, []);

  /**
   * Changes the current language and saves the preference
   */
  const changeLanguage = async (language: string): Promise<void> => {
    if (language !== currentLanguage) {
      setCurrentLanguage(language);
      await saveLanguagePreference(language);
    }
  };

  // Toggle between English and Sinhala
  const toggleLanguage = async (): Promise<void> => {
    const newLanguage = currentLanguage === LANGUAGES.ENGLISH 
      ? LANGUAGES.SINHALA 
      : LANGUAGES.ENGLISH;
    
    await changeLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        changeLanguage, 
        isLoading 
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Export the context in case it's needed directly
export default LanguageContext;