import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Divider, Button, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../App';
import useTranslate from '../hooks/useTranslate';
import { useLanguage } from '../contexts/LanguageContext';
import { getDiseaseInfo } from '../data/diseaseInfo';

type InfoScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Info'>;
  route: RouteProp<AppStackParamList, 'Info'>;
};

const InfoScreen = ({ navigation, route }: InfoScreenProps) => {
  const { disease } = route.params;
  const { t } = useTranslate();
  const { currentLanguage } = useLanguage();
  
  // Get the disease info based on the current language
  const diseaseInfo = getDiseaseInfo(currentLanguage);
  const info = diseaseInfo[disease as keyof typeof diseaseInfo] || diseaseInfo['overview'];
  
  if (disease === 'overview') {
    // Overview screen showing list of all diseases
    const overviewInfo = info as { title: string; description: string; diseases: string[] };
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.card}>
            <Card.Title title={t('info.commonDiseases')} titleStyle={styles.cardTitle} />
            <Card.Content>
              <Text style={styles.description}>{t('info.diseasesDescription')}</Text>
              <Divider style={styles.divider} />
              <Text style={styles.sectionTitle}>{t('info.diseasesList')}</Text>
              
              {(info as { diseases: string[] }).diseases.map((diseaseName, index) => (
                <List.Item
                  key={index}
                  title={diseaseName}
                  description={t('info.tapForInfo')}
                  left={props => <List.Icon {...props} icon="leaf" color="#4CAF50" />}
                  onPress={() => navigation.navigate('Info', { disease: diseaseName })}
                  style={styles.listItem}
                />
              ))}
            </Card.Content>
          </Card>
          
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Home')}
            style={styles.button}
            buttonColor="#4CAF50"
            icon="home"
          >
            {t('common.backToHome')}
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  // Detailed disease information screen
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Title 
            title={disease} 
            subtitle={'scientificName' in info ? `${t('info.scientificName')}: ${info.scientificName}` : undefined}
            titleStyle={styles.cardTitle}
          />
          
          <Card.Content>
            <Text style={styles.description}>{info.description}</Text>
            <Divider style={styles.divider} />
            
            <Text style={styles.sectionTitle}>{t('info.causes')}</Text>
            <Text style={styles.sectionContent}>{'causes' in info ? String(info.causes) : ''}</Text>
            
            {'symptoms' in info && Array.isArray(info.symptoms) && (
              <>
                <Text style={styles.sectionTitle}>{t('info.symptoms')}</Text>
                {info.symptoms.map((symptom, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{symptom}</Text>
                  </View>
                ))}
              </>
            )}
            
            {'management' in info && Array.isArray(info.management) && (
              <>
                <Text style={styles.sectionTitle}>{t('info.management')}</Text>
                {info.management.map((step, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{step}</Text>
                  </View>
                ))}
              </>
            )}
            
            {'impact' in info && (
              <>
                <Text style={styles.sectionTitle}>{t('info.economicImpact')}</Text>
                <Text style={styles.sectionContent}>{String(info.impact)}</Text>
              </>
            )}
          </Card.Content>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Info', { disease: 'overview' })}
            style={styles.button}
            buttonColor="#4CAF50"
            icon="view-list"
          >
            {t('common.allDiseases')}
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Home')}
            style={styles.button}
            textColor="#4CAF50"
            icon="home"
          >
            {t('common.backToHome')}
          </Button>
        </View>
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
    paddingBottom: 30,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    marginBottom: 16,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 16,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
    width: 16,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  listItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  buttonContainer: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 8,
  },
});

export default InfoScreen;