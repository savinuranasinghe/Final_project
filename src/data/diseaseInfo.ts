import { diseaseInfo as diseaseInfoEn } from './diseaseInfoEn';
import { diseaseInfo as diseaseInfoSi } from './diseaseInfoSi';
import { LANGUAGES } from '../services/localizationService';

export const getDiseaseInfo = (language: string) => {
  return language === LANGUAGES.SINHALA ? diseaseInfoSi : diseaseInfoEn;
};