import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { PredictionResult } from '../../src/services/mlService';
import { getConfidenceColor, getSeverityColor } from '../../src/utils/diseaseUtils';

type ResultDetailsCardProps = {
  result: PredictionResult | null;
  recommendations: any;
  titleLabel: string;
  confidenceLabel: string;
  severityLabel: string;
  descriptionLabel: string;
  treatmentLabel: string;
  preventionLabel: string;
  translateDisease: (diseaseId: string) => string;
  translateSeverity: (severity: string) => string;
};

const ResultDetailsCard = ({ 
  result, 
  recommendations, 
  titleLabel, 
  confidenceLabel,
  severityLabel,
  descriptionLabel,
  treatmentLabel,
  preventionLabel,
  translateDisease,
  translateSeverity
}: ResultDetailsCardProps) => {
  return (
    <Card style={styles.resultCard}>
      <Card.Title
        title={titleLabel}
        titleStyle={styles.cardTitle}
      />
      <Card.Content>
        <Text style={[
          styles.diseaseText,
          { color: result?.disease === 'healthy' ? '#2e7d32' : '#d32f2f' }
        ]}>
          {translateDisease(result?.disease || '')}
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>{confidenceLabel}</Text>
            <Text style={[styles.statValue, { color: getConfidenceColor(result?.confidence || 0) }]}>
              {result?.confidence}%
            </Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>{severityLabel}</Text>
            <Text style={[styles.statValue, { color: getSeverityColor(result?.severity || 'N/A') }]}>
              {translateSeverity(result?.severity || 'N/A')}
            </Text>
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        <Text style={styles.sectionTitle}>
          {descriptionLabel}
        </Text>
        <Text style={styles.sectionContent}>
          {result?.description}
        </Text>
        
        <Text style={styles.sectionTitle}>
          {treatmentLabel}
        </Text>
        <Text style={styles.sectionContent}>
          {recommendations?.treatment}
        </Text>
        
        <Text style={styles.sectionTitle}>
          {preventionLabel}
        </Text>
        <Text style={styles.sectionContent}>
          {recommendations?.prevention}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  resultCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  diseaseText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statBox: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
    fontSize: 16,
  },
  sectionContent: {
    marginBottom: 16,
    fontSize: 15,
    lineHeight: 22,
  },
});

export default ResultDetailsCard;