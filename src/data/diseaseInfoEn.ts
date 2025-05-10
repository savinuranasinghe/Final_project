export const diseaseInfo = {
    'overview': {
      title: 'Common Tomato Leaf Diseases',
      description: 'Tomato plants are susceptible to various diseases that can affect their leaves, stems, and fruits. Early detection and proper management are key to preventing crop losses.',
      diseases: [
        'Early Blight',
        'Late Blight',
        'Septoria Leaf Spot',
        'Bacterial Spot',
        'Leaf Mold',
        'Spider Mites',
        'Target Spot',
        'Tomato Yellow Leaf Curl Virus',
        'Tomato Mosaic Virus',
        'Powdery Mildew'
      ],
    },
    'Early Blight': {
      scientificName: 'Alternaria solani',
      description: 'Early blight is a common fungal disease that affects tomato plants. It appears as dark brown spots with concentric rings, creating a target-like pattern on lower, older leaves first.',
      causes: 'The fungus survives in plant debris and soil, and spreads through water splash, wind, tools, and insects. Warm, humid conditions with temperatures between 24-29°C favor its development.',
      symptoms: [
        'Dark brown spots with concentric rings (target-like pattern)',
        'Yellowing around the spots',
        'Affected leaves eventually dry up and die',
        'Typically starts on lower, older leaves',
        'Can also affect stems and fruit',
      ],
      management: [
        'Remove and destroy infected plant parts',
        'Apply approved fungicides according to label directions',
        'Maintain good air circulation between plants',
        'Use drip irrigation instead of overhead watering',
        'Practice crop rotation with non-solanaceous crops',
        'Mulch around plants to prevent soil splash',
      ],
      impact: 'Early blight can reduce yields by 30-50% if not controlled. The disease weakens plants by reducing photosynthetic area, leading to smaller fruits and lower overall production.',
    },
    'Late Blight': {
      scientificName: 'Phytophthora infestans',
      description: 'Late blight is a highly destructive disease that affects tomatoes and potatoes. It was responsible for the Irish Potato Famine in the 1840s. The disease can destroy entire crops within days under favorable conditions.',
      causes: 'The water mold Phytophthora infestans thrives in cool, wet weather (15-25°C) with high humidity. It spreads rapidly through rain, wind, irrigation water, and mechanical means.',
      symptoms: [
        'Pale green to brown water-soaked spots on leaves',
        'White fuzzy growth on leaf undersides (in humid conditions)',
        'Rapid blackening and death of leaf tissue',
        'Dark brown lesions on stems',
        'Firm, greasy-looking brown patches on fruit',
        'Rapid plant collapse in severe cases',
      ],
      management: [
        'Remove and destroy infected plants immediately',
        'Apply protective fungicides before symptoms appear',
        'Apply copper-based fungicides for organic production',
        'Monitor weather forecasts for late blight favorable conditions',
        'Harvest remaining healthy fruit if disease is detected',
      ],
      impact: 'Late blight can cause total crop loss within 7-10 days under favorable conditions. It affects all plant parts and can survive in potato tubers, making it a recurring threat.',
    },
    'Bacterial Spot': {
      scientificName: 'Xanthomonas spp.',
      description: 'Bacterial spot is a destructive disease affecting tomatoes in warm, humid regions. It can affect all above-ground parts of the plant, including leaves, stems, and fruits.',
      causes: 'Caused by several Xanthomonas species bacteria that survive in seeds, plant debris, and volunteer plants. The bacteria spread through rain splash, overhead irrigation, and handling of wet plants.',
      symptoms: [
        'Small, water-soaked spots on leaves that enlarge and turn brown',
        'Spots may have yellow halos',
        'Spots can coalesce to form large necrotic areas',
        'Raised, scab-like lesions on fruits',
        'Defoliation in severe cases',
      ],
      management: [
        'Apply copper-based bactericides preventatively',
        'Remove and destroy infected plant parts',
        'Avoid working with plants when wet',
        'Disinfect tools regularly',
        'Maintain good air circulation',
      ],
      impact: 'Bacterial spot can lead to significant defoliation, exposing fruits to sunscald. Infected fruits develop lesions that make them unmarketable. Yield losses can range from 10-50% in severe cases.',
    },
    'Septoria Leaf Spot': {
      scientificName: 'Septoria lycopersici',
      description: 'Septoria leaf spot is a common fungal disease that primarily affects the leaves of tomato plants. It rarely affects fruits directly but can severely reduce yields by defoliating plants.',
      causes: 'The fungus overwinters on crop debris and weeds. It spreads by water splash, tools, and workers\' hands. Warm temperatures (20-25°C) with high humidity and leaf wetness favor infection.',
      symptoms: [
        'Small, circular spots with dark borders and light gray centers',
        'Numerous tiny black dots (pycnidia) visible in the spots',
        'Starts on lower leaves and progresses upward',
        'Infected leaves turn yellow, then brown, and eventually drop',
        'Rarely affects stems or fruits',
      ],
      management: [
        'Remove and destroy infected leaves',
        'Apply approved fungicides at first sign of disease',
        'Maintain good air circulation between plants',
        'Avoid working with plants when wet',
        'Remove all plant debris at the end of the season',
      ],
      impact: 'Septoria leaf spot can cause severe defoliation, exposing fruits to sunscald and reducing plant vigor. This results in smaller and fewer fruits, leading to yield losses of up to 50%.',
    },
    'Leaf Mold': {
      scientificName: 'Passalora fulva',
      description: 'Leaf mold is a fungal disease that primarily affects the foliage of tomato plants, especially in humid conditions or in greenhouse settings.',
      causes: 'The fungus thrives in humid environments (85%+ humidity) with moderate temperatures (24-26°C). Poor air circulation and dense foliage create ideal conditions for infection.',
      symptoms: [
        'Pale green or yellow spots on the upper leaf surface',
        'Olive-green to grayish-brown fuzzy growth on the undersides of leaves',
        'Affected leaves may curl, wither, and drop prematurely',
        'Severe infections can affect stems and fruit calyx',
        'Reduced photosynthesis leading to stunted growth and reduced yields'
      ],
      management: [
        'Improve air circulation around plants',
        'Reduce humidity in greenhouses',
        'Remove and destroy infected leaves',
        'Apply fungicides containing chlorothalonil or mancozeb',
        'Use resistant varieties when available',
        'Avoid overhead irrigation to keep foliage dry'
      ],
      impact: 'Leaf mold can reduce yields by 30-50% in favorable conditions due to reduced photosynthesis and premature defoliation, which exposes fruits to sunscald.',
    },
    'Spider Mites': {
      scientificName: 'Tetranychus urticae',
      description: 'Two-spotted spider mites are tiny arachnids that feed on plant cells, causing stippling on leaves and, in severe cases, significant leaf damage and yield reduction.',
      causes: 'Spider mites thrive in hot, dry conditions. They reproduce rapidly, with each female laying hundreds of eggs in just a few weeks. Excessive use of broad-spectrum insecticides can trigger outbreaks by killing natural predators.',
      symptoms: [
        'Tiny yellow or white speckles (stippling) on leaves',
        'Fine webbing on the undersides of leaves in severe infestations',
        'Leaves turning yellow, bronzed, or brown',
        'Leaf drop in severe cases',
        'Stunted plant growth',
        'Tiny moving dots visible with a magnifying glass'
      ],
      management: [
        'Regularly spray plants with water to discourage mites',
        'Apply insecticidal soap or horticultural oil',
        'Introduce predatory mites for biological control',
        'For severe infestations, apply miticides according to label instructions',
        'Increase humidity around plants',
        'Remove heavily infested leaves or plants'
      ],
      impact: 'Spider mites can reduce yields by 15-40% when uncontrolled. They damage plant cells, reducing photosynthesis and causing stress that affects fruit development and plant health.',
    },
    'Target Spot': {
      scientificName: 'Corynespora cassiicola',
      description: 'Target spot is a fungal disease that affects tomato leaves, stems, and fruits, creating distinctive target-like spots that can lead to significant defoliation.',
      causes: 'The fungus thrives in warm, humid conditions with temperatures between 20-32°C. It can survive in plant debris and can be spread by wind, rain splash, tools, and workers.',
      symptoms: [
        'Brown circular spots with concentric rings (target-like pattern)',
        'Spots can enlarge to 1-2 cm in diameter',
        'Centers of spots may dry out and tear',
        'Affects all above-ground parts of the plant',
        'Severe infections cause leaf yellowing and drop',
        'Fruit lesions appear as small, dark, sunken spots'
      ],
      management: [
        'Apply fungicides containing chlorothalonil or mancozeb',
        'Remove and destroy infected plant material',
        'Improve air circulation around plants',
        'Avoid overhead irrigation',
        'Practice crop rotation with non-solanaceous crops',
        'Sanitize tools and stakes between seasons'
      ],
      impact: 'Target spot can reduce yields by 20-50% through defoliation, fruit infection, and reduced plant vigor. Fruit lesions make tomatoes unmarketable for fresh sales.',
    },
    'Tomato Yellow Leaf Curl Virus': {
      scientificName: 'Begomovirus family',
      description: 'Tomato Yellow Leaf Curl Virus (TYLCV) is a devastating viral disease transmitted by whiteflies. It can cause severe yield losses and is difficult to control once established.',
      causes: 'The virus is transmitted by the silverleaf whitefly (Bemisia tabaci). It can persist in infected plants and weeds, and whiteflies can spread it quickly throughout a field.',
      symptoms: [
        'Upward curling and yellowing of leaf edges',
        'Leaves become small and crumpled',
        'Plants appear stunted with a bushy appearance',
        'Flower drop and significantly reduced fruit set',
        'Fruits that develop may be small and of poor quality',
        'Symptoms appear 2-3 weeks after infection'
      ],
      management: [
        'Use virus-resistant varieties',
        'Control whitefly populations with appropriate insecticides or traps',
        'Remove and destroy infected plants immediately',
        'Use reflective mulches to repel whiteflies',
        'Install fine mesh screens in greenhouse production',
        'Maintain weed-free fields to eliminate alternate hosts'
      ],
      impact: 'TYLCV can cause yield losses of 50-100% when infections occur early in the growing season. The virus drastically reduces fruit production and quality, making crop production economically unviable in severely affected areas.',
    },
    'Tomato Mosaic Virus': {
      scientificName: 'Tobamovirus genus',
      description: 'Tomato Mosaic Virus (ToMV) is a highly stable and contagious viral disease that affects tomatoes worldwide. It can survive for years in soil and plant debris.',
      causes: 'The virus is primarily spread through contaminated tools, hands, and clothing. It can also be transmitted through infected seeds and can survive in cigarettes and other tobacco products.',
      symptoms: [
        'Mottled light and dark green or yellow areas on leaves',
        'Leaves may be curled, wrinkled, or smaller than normal',
        'Fern-like appearance of leaves (filiforin)',
        'Stunted plant growth',
        'Reduced fruit set',
        'Yellow rings or spots on fruits'
      ],
      management: [
        'Use virus-free seeds and transplants',
        'Wash hands thoroughly after handling tobacco products',
        'Disinfect tools with 10% bleach solution or 70% alcohol',
        'Remove and destroy infected plants',
        'Practice crop rotation',
        'Use resistant varieties when available'
      ],
      impact: 'ToMV can reduce yields by 10-70% depending on the strain and timing of infection. Early infections lead to stunted plants with little to no harvest, while later infections mainly affect fruit quality.',
    },
    'Powdery Mildew': {
      scientificName: 'Leveillula taurica, Oidium neolycopersici',
      description: 'Powdery mildew is a fungal disease that appears as a white powdery coating on tomato leaves. Unlike many fungal diseases, it can thrive in both dry and humid conditions.',
      causes: 'The fungus prefers moderate temperatures (15-27°C) and can develop with or without free water. High humidity favors spore germination, but the fungus can infect plants in dry conditions as well.',
      symptoms: [
        'White powdery spots or patches on upper leaf surfaces',
        'Spots gradually spread to cover entire leaf surfaces',
        'Yellowing of affected leaves',
        'Leaves may become distorted or twisted',
        'Premature leaf drop in severe cases',
        'Reduced plant vigor and yield'
      ],
      management: [
        'Apply fungicides containing sulfur or potassium bicarbonate',
        'Use organic options like neem oil or milk spray (1:10 milk to water)',
        'Improve air circulation between plants',
        'Remove severely infected leaves',
        'Avoid excessive nitrogen fertilization',
        'Water at the base of plants, not on foliage'
      ],
      impact: 'Powdery mildew can reduce yields by 10-30% by decreasing photosynthetic area and causing stress to the plant. Severe infections lead to defoliation, exposing fruits to sunscald and reducing marketable yields.',
    }
  };