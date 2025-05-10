import * as FileSystem from 'expo-file-system';
import { LANGUAGES } from '../services/localizationService';
import { ML_API_URL } from '@env';

// Cloud Run URL from environment variables
const API_URL = ML_API_URL;

/**
 * Interface for the prediction result returned from the ML service
 */
export interface PredictionResult {
  disease: string;
  displayName: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High' | 'N/A';
  description: string;
}

/**
 * Analyzes a tomato leaf image and returns disease prediction
 * @param imageUri - URI of the image to analyze
 * @returns Promise with prediction result
 */
export const analyzeLeafImage = async (imageUri: string): Promise<PredictionResult> => {
  try {
    // Convert image to base64
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Prepare the request body
    const body = JSON.stringify({
      image: base64
    });

    // Make API request to the Cloud Run service
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    // Parse the response
    const result = await response.json();
    return result as PredictionResult;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error; // Re-throw the error to show it in the UI
  }
};

/**
 * Gets customized treatment recommendations based on the detected disease and language
 * @param disease - The disease identifier
 * @param language - The language code (default: 'en')
 * @returns Object containing treatment recommendations
 */
export const getTreatmentRecommendations = (disease: string, language = 'en') => {
  // English recommendations
  const recommendationsEn = {
    'Bacterial_spot': {
      treatment: 'Apply copper-based bactericides according to label instructions. Remove and destroy infected leaves and fruits.',
      prevention: 'Use disease-free seeds and transplants. Avoid overhead irrigation. Practice crop rotation with non-solanaceous crops.',
    },
    'Early_blight': {
      treatment: 'Apply fungicides containing chlorothalonil, mancozeb, or copper. Remove infected leaves to prevent spread.',
      prevention: 'Ensure proper plant spacing for air circulation. Use mulch to prevent soil splash. Water at the base of plants, not the leaves.',
    },
    'Late_blight': {
      treatment: 'Apply copper-based fungicides or specific late blight fungicides. Remove and destroy infected plants immediately.',
      prevention: 'Plant resistant varieties. Avoid watering foliage. Destroy volunteer tomato plants. Plant in well-drained soil.',
    },
    'Leaf_Mold': {
      treatment: 'Apply fungicides with chlorothalonil. Improve air circulation around plants.',
      prevention: 'Increase spacing between plants. Reduce humidity in greenhouses. Remove and destroy infected leaves.',
    },
    'Septoria_leaf_spot': {
      treatment: 'Apply fungicides with chlorothalonil or copper. Remove infected leaves promptly.',
      prevention: 'Mulch around plants to prevent soil splash. Use drip irrigation. Practice crop rotation.',
    },
    'Spider_mites Two-spotted_spider_mite': {
      treatment: 'Apply insecticidal soap or neem oil. For severe infestations, use appropriate miticides.',
      prevention: 'Regularly spray plants with water to discourage mites. Introduce predatory mites. Maintain plant vigor with proper watering and nutrients.',
    },
    'Target_Spot': {
      treatment: 'Apply fungicides with chlorothalonil or mancozeb. Remove infected leaves.',
      prevention: 'Avoid overhead irrigation. Maintain good air circulation. Practice crop rotation.',
    },
    'Tomato_Yellow_Leaf_Curl_Virus': {
      treatment: 'No cure exists for infected plants. Remove and destroy infected plants to prevent spread.',
      prevention: 'Use virus-resistant varieties. Control whitefly populations with appropriate insecticides or traps. Use reflective mulches.',
    },
    'Tomato_mosaic_virus': {
      treatment: 'No cure exists for infected plants. Remove and destroy infected plants to prevent spread.',
      prevention: 'Use virus-free seeds and transplants. Wash hands after handling tobacco products before touching plants. Disinfect tools.',
    },
    'powdery_mildew': {
      treatment: 'Apply fungicides with sulfur or potassium bicarbonate. Remove heavily infected leaves.',
      prevention: 'Ensure good air circulation. Avoid overhead watering. Plant resistant varieties if available.',
    },
    'healthy': {
      treatment: 'No treatment needed. Continue regular care.',
      prevention: 'Maintain regular watering, proper spacing, and good soil nutrition. Monitor for early signs of pests or diseases.',
    },
    'not_tomato_leaf': {
      treatment: 'Not applicable. The image does not appear to be a tomato leaf.',
      prevention: 'Please upload an image of a tomato leaf for accurate disease diagnosis.',
    }
  };
  
  // Sinhala recommendations
  const recommendationsSi = {
    'Bacterial_spot': {
      treatment: 'ලේබල් උපදෙස් අනුව තඹ පාදක බැක්ටීරියා නාශක යොදන්න. ආසාදිත කොළ සහ පලතුරු ඉවත් කර විනාශ කරන්න.',
      prevention: 'රෝග රහිත බීජ සහ පැළ භාවිතා කරන්න. ඉහළින් වාරි ජලය දැමීමෙන් වළකින්න. සොලනේසස් නොවන බෝග සමඟ බෝග මාරු කිරීම භාවිතා කරන්න.',
    },
    'Early_blight': {
      treatment: 'ක්ලෝරෝතලොනිල්, මැන්කොසෙබ්, හෝ තඹ අඩංගු දිලීර නාශක යොදන්න. ව්‍යාප්ත වීම වැළැක්වීමට ආසාදිත කොළ ඉවත් කරන්න.',
      prevention: 'වාතය ගමන් කිරීම සඳහා නිසි පැළ පරතරය සහතික කරන්න. පස් ඉසිරීම වැළැක්වීමට මල්ච් භාවිතා කරන්න. කොළ නොව පැළවල පාදම වෙත ජලය දමන්න.',
    },
    'Late_blight': {
      treatment: 'තඹ පාදක දිලීර නාශක හෝ විශේෂිත පසු පිළිස්සුම් දිලීර නාශක යොදන්න. ආසාදිත පැළ වහාම ඉවත් කර විනාශ කරන්න.',
      prevention: 'ප්‍රතිරෝධී ප්‍රභේද සිටුවන්න. පත්‍ර තෙමීමෙන් වළකින්න. වලන්ටියර් තක්කාලි පැළ විනාශ කරන්න. හොඳින් ජලය බැස යන පසෙහි සිටුවන්න.',
    },
    'Leaf_Mold': {
      treatment: 'ක්ලෝරෝතලොනිල් සහිත දිලීර නාශක යොදන්න. පැළ වටා වාතය ගමන් කිරීම වැඩි දියුණු කරන්න.',
      prevention: 'පැළ අතර දුර වැඩි කරන්න. හරිතාගාර තුළ ආර්ද්‍රතාවය අඩු කරන්න. ආසාදිත කොළ ඉවත් කර විනාශ කරන්න.',
    },
    'Septoria_leaf_spot': {
      treatment: 'ක්ලෝරෝතලොනිල් හෝ තඹ සහිත දිලීර නාශක යොදන්න. ආසාදිත කොළ වහාම ඉවත් කරන්න.',
      prevention: 'පස් ඉසිරීම වැළැක්වීමට පැළ වටා මල්ච් කරන්න. බිංදු වාරි ජලය භාවිතා කරන්න. බෝග මාරුව භාවිතා කරන්න.',
    },
    'Spider_mites Two-spotted_spider_mite': {
      treatment: 'කෘමි නාශක සබන් හෝ නීම් තෙල් යොදන්න. දැඩි ආසාදන සඳහා සුදුසු මයිටිසයිඩ භාවිතා කරන්න.',
      prevention: 'මයිට් දිරිමත් නොකිරීමට නිතිපතා පැළවලට ජලය ඉසින්න. දඩයම් මයිට් හඳුන්වා දෙන්න. නිසි ජල සම්පාදනය සහ පෝෂක මගින් පැළ ශක්තිය පවත්වා ගන්න.',
    },
    'Target_Spot': {
      treatment: 'ක්ලෝරෝතලොනිල් හෝ මැන්කොසෙබ් සහිත දිලීර නාශක යොදන්න. ආසාදිත කොළ ඉවත් කරන්න.',
      prevention: 'ඉහළින් වාරි ජලය දැමීමෙන් වළකින්න. හොඳ වාතය ගමන් කිරීම පවත්වා ගන්න. බෝග මාරුව භාවිතා කරන්න.',
    },
    'Tomato_Yellow_Leaf_Curl_Virus': {
      treatment: 'ආසාදිත පැළ සඳහා ප්‍රතිකාරයක් නොමැත. ව්‍යාප්ත වීම වැළැක්වීමට ආසාදිත පැළ ඉවත් කර විනාශ කරන්න.',
      prevention: 'වෛරස් ප්‍රතිරෝධී ප්‍රභේද භාවිතා කරන්න. සුදුසු කෘමිනාශක හෝ උගුල් මගින් සුදු මැස්සන් පාලනය කරන්න. පරාවර්තක මල්ච් භාවිතා කරන්න.',
    },
    'Tomato_mosaic_virus': {
      treatment: 'ආසාදිත පැළ සඳහා ප්‍රතිකාරයක් නොමැත. ව්‍යාප්ත වීම වැළැක්වීමට ආසාදිත පැළ ඉවත් කර විනාශ කරන්න.',
      prevention: 'වෛරස් රහිත බීජ සහ පැළ භාවිතා කරන්න. පැළ ස්පර්ශ කිරීමට පෙර දුම්කොළ නිෂ්පාදන හැසිරවීමෙන් පසු අත් සෝදන්න. මෙවලම් විෂබීජහරණය කරන්න.',
    },
    'powdery_mildew': {
      treatment: 'සල්ෆර් හෝ පොටෑසියම් බයිකාබනේට් සහිත දිලීර නාශක යොදන්න. දැඩි ලෙස ආසාදිත කොළ ඉවත් කරන්න.',
      prevention: 'හොඳ වාතය ගමන් කිරීම සහතික කරන්න. ඉහළින් ජලය දැමීමෙන් වළකින්න. හැකි නම් ප්‍රතිරෝධී ප්‍රභේද සිටුවන්න.',
    },
    'healthy': {
      treatment: 'ප්‍රතිකාර අවශ්‍ය නැත. නිතිපතා රැකබලා ගැනීම කරගෙන යන්න.',
      prevention: 'නිතිපතා ජලය දැමීම, නිසි පරතරයක් තබා ගැනීම, සහ හොඳ පස පෝෂණය පවත්වා ගන්න. පළිබෝධ හෝ රෝග පිළිබඳ මුල් සලකුණු සඳහා නිරීක්ෂණය කරන්න.',
    },
    'not_tomato_leaf': {
      treatment: 'අදාළ නොවේ. රූපය තක්කාලි කොළයක් ලෙස නොපෙනේ.',
      prevention: 'නිවැරදි රෝග විනිශ්චයක් සඳහා කරුණාකර තක්කාලි කොළයක රූපයක් උඩුගත කරන්න.',
    }
  };
  
  // Default recommendations for unknown diseases
  const defaultEn = {
    treatment: 'Consult with an agricultural expert for specific recommendations.',
    prevention: 'Practice good crop management including proper spacing, watering, and crop rotation.',
  };
  
  const defaultSi = {
    treatment: 'විශේෂිත නිර්දේශ සඳහා කෘෂිකාර්මික විශේෂඥයෙකුගෙන් උපදෙස් ලබා ගන්න.',
    prevention: 'නිසි පරතරය, ජලය දැමීම, සහ බෝග මාරුව ඇතුළුව හොඳ බෝග කළමනාකරණ ක්‍රම අනුගමනය කරන්න.',
  };
  
  // Select the right language recommendations
  const recommendations = language === LANGUAGES.SINHALA ? recommendationsSi : recommendationsEn;
  const defaultRecs = language === LANGUAGES.SINHALA ? defaultSi : defaultEn;
  
  return recommendations[disease as keyof typeof recommendations] || defaultRecs;
};

// Localized disease descriptions for both languages
export const getDiseaseDescriptions = (language = 'en') => {
  const descriptionsEn = {
    'Bacterial_spot': 'Bacterial spot is caused by Xanthomonas species. It appears as small, water-soaked spots that enlarge and turn dark brown to black with a yellow halo. It can affect leaves, stems, and fruits of tomato plants.',
    'Early_blight': 'Early blight is caused by the fungus Alternaria solani. It appears as dark brown spots with concentric rings, forming a target-like pattern. The disease typically affects older leaves first and can spread to stems and fruits.',
    'Late_blight': 'Late blight is caused by the water mold Phytophthora infestans. It appears as dark, water-soaked lesions on leaves that quickly enlarge and turn brown. White, fuzzy growth may appear on the undersides of leaves in humid conditions.',
    'Leaf_Mold': 'Leaf mold is caused by the fungus Passalora fulva. It appears as pale green or yellow spots on the upper leaf surface with olive-green to grayish-brown fuzzy mold on the undersides. It thrives in humid conditions.',
    'Septoria_leaf_spot': 'Septoria leaf spot is caused by the fungus Septoria lycopersici. It appears as numerous small, circular spots with dark borders and light gray centers. It typically begins on the lower leaves and moves upward as the disease progresses.',
    'Spider_mites Two-spotted_spider_mite': 'Two-spotted spider mites cause tiny yellow or white speckles on leaves. Severe infestations lead to leaf yellowing, webbing on the undersides of leaves, and eventual leaf drop. Plants become stunted and may die if the infestation is severe.',
    'Target_Spot': 'Target spot is caused by the fungus Corynespora cassiicola. It appears as brown circular spots with concentric rings resembling a target or bullseye. It can affect leaves, stems, and fruits of tomato plants.',
    'Tomato_Yellow_Leaf_Curl_Virus': 'TYLCV is transmitted by whiteflies. Infected plants show upward curling of leaves, yellowing leaf edges, stunted growth, and flower drop. This viral disease can cause significant yield loss and there is no cure for infected plants.',
    'Tomato_mosaic_virus': 'Tomato mosaic virus appears as mottled light and dark green or yellow areas on leaves. Leaves may be curled, wrinkled, or smaller than normal. The virus can be transmitted through infected seeds, plants, and even tobacco products.',
    'powdery_mildew': 'Powdery mildew appears as white powdery spots on the upper surfaces of leaves. These spots gradually spread to cover the entire leaf surface. Severe infections can cause leaf yellowing, distortion, and premature leaf drop.',
    'healthy': 'This plant appears healthy with no visible signs of disease. Healthy tomato leaves are typically deep green, with a slightly fuzzy texture and a distinct tomato smell.',
    'not_tomato_leaf': 'This image does not appear to be a tomato leaf. Please submit an image of a tomato leaf for accurate disease detection and recommendations.'
  };
  
  const descriptionsSi = {
    'Bacterial_spot': 'බැක්ටීරියා පැල්ලම Xanthomonas විශේෂ මගින් ඇති කරයි. එය කුඩා, ජලයෙන් පෙඟුණු පැල්ලම් ලෙස දිස් වන අතර, ඒවා විශාල වී කහ වළලු සහිත අඳුරු දුඹුරු සිට කළු පැහැයට හැරේ. එය තක්කාලි පැළවල කොළ, කඳන්, සහ පලතුරු වලට බලපෑම් කළ හැකිය.',
    'Early_blight': 'මුල් අදියරේ පිළිස්සුම Alternaria solani දිලීරය මගින් ඇති කරයි. එය වටයාකාර වලල්ලන් සහිත අඳුරු දුඹුරු පැල්ලම් ලෙස දිස් වන අතර, ඉලක්කයක් වැනි රටාවක් සාදයි. රෝගය සාමාන්‍යයෙන් වයස්ගත කොළ මුලින්ම ආක්‍රමණය කරන අතර එය කඳන් සහ පලතුරු වලටද පැතිරිය හැකිය.',
    'Late_blight': 'පසු අදියරේ පිළිස්සුම Phytophthora infestans නම් ජල පූස මගින් ඇති කරයි. එය කොළ මත අඳුරු, ජලයෙන් පෙඟුණු තුවාල ලෙස දිස් වන අතර ඒවා ඉක්මනින් විශාල වී දුඹුරු පැහැයට හැරේ. තෙත සහිත තත්ත්ව යටතේ කොළවල යටි පැත්තේ සුදු, පූර්ණ වර්ධනයක් දිස් විය හැකිය.',
    'Leaf_Mold': 'කොළ පූස් Passalora fulva දිලීරය මගින් ඇති කරයි. එය ඉහළ කොළ මතුපිට පාට අළු හෝ කහ පැල්ලම් ලෙස දිස් වන අතර, යටි පැත්තේ ඔලිව්-කොළ සිට අළු-දුඹුරු පැහැති පූර්ණ පූස් ඇත. එය අධික තෙත සහිත තත්ත්ව යටතේ වර්ධනය වේ.',
    'Septoria_leaf_spot': 'සෙප්ටෝරියා කොළ පැල්ලම Septoria lycopersici දිලීරය මගින් ඇති කරයි. එය අඳුරු මායිම් සහ ලා අළු මධ්‍යස්ථාන සහිත බොහෝ කුඩා, වටයාකාර පැල්ලම් ලෙස දිස් වේ. එය සාමාන්‍යයෙන් පහළ කොළ වලින් ආරම්භ වන අතර රෝගය වර්ධනය වන විට ඉහළට ගමන් කරයි.',
    'Spider_mites Two-spotted_spider_mite': 'ද්වි-ලක්ෂිත මකුළු මයිට් කොළ මත කුඩා කහ හෝ සුදු පැල්ලම් ඇති කරයි. දැඩි ආසාදන මගින් කොළ කහ වීම, කොළවල යටි පැත්තේ දැල් ඇතිවීම, සහ අවසානයේ කොළ වැටීම සිදු වේ. ආසාදනය දැඩි නම් පැළ වර්ධනය අඩාල වී මිය යා හැකිය.',
    'Target_Spot': 'ඉලක්ක පැල්ලම Corynespora cassiicola දිලීරය මගින් ඇති කරයි. එය ඉලක්කයක් හෝ ඇස් ඉලක්කයක් වැනි වටයාකාර වලලු සහිත දුඹුරු වටයාකාර පැල්ලම් ලෙස දිස් වේ. එය තක්කාලි පැළවල කොළ, කඳන්, සහ පලතුරු වලට බලපෑම් කළ හැකිය.',
    'Tomato_Yellow_Leaf_Curl_Virus': 'TYLCV සුදු මැස්සන් මගින් සම්ප්‍රේෂණය වේ. ආසාදිත පැළවල කොළ ඉහළට නැවීම, කොළ දාර කහ වීම, වර්ධනය අඩාල වීම, සහ මල් වැටීම දක්නට ලැබේ. මෙම වෛරස් රෝගය සැලකිය යුතු අස්වැන්න අහිමි වීමට හේතු විය හැකි අතර ආසාදිත පැළ සඳහා ප්‍රතිකාරයක් නොමැත.',
    'Tomato_mosaic_virus': 'තක්කාලි මොසෙයික් වෛරසය කොළ මත ලා හා අඳුරු කොළ හෝ කහ ප්‍රදේශ ලෙස දිස් වේ. කොළ නැවී, රැලි ගැසී, හෝ සාමාන්‍යයට වඩා කුඩා විය හැකිය. වෛරසය ආසාදිත බීජ, පැළ, සහ දුම්කොළ නිෂ්පාදන මගින් පවා සම්ප්‍රේෂණය විය හැකිය.',
    'powdery_mildew': 'කුඩු පූස් කොළවල ඉහළ මතුපිට සුදු කුඩු පැල්ලම් ලෙස දිස් වේ. මෙම පැල්ලම් ක්‍රමයෙන් මුළු කොළ මතුපිට ආවරණය කිරීමට පැතිරේ. දැඩි ආසාදන මගින් කොළ කහ වීම, විකෘති වීම, සහ අකාලයේ කොළ වැටීම ඇති විය හැකිය.',
    'healthy': 'මෙම පැළය රෝග ලක්ෂණ කිසිවක් නොපෙන්වා සෞඛ්‍ය සම්පන්න ලෙස පෙනේ. සෞඛ්‍ය සම්පන්න තක්කාලි කොළ සාමාන්‍යයෙන් ගැඹුරු කොළ පැහැයෙන් යුක්ත වන අතර, මඳක් රෝම සහිත මතුපිටක් සහ විශේෂිත තක්කාලි සුවඳක් ඇත.',
    'not_tomato_leaf': 'මෙම රූපය තක්කාලි කොළයක් ලෙස නොපෙනේ. නිවැරදි රෝග හඳුනා ගැනීමක් සඳහා කරුණාකර තක්කාලි කොළයක රූපයක් ඉදිරිපත් කරන්න.'
  };
  
  return language === LANGUAGES.SINHALA ? descriptionsSi : descriptionsEn;
};