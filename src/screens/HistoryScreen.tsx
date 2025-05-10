// src/screens/HistoryScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, IconButton, Divider } from 'react-native-paper';
import { HistoryItem, getUserHistory, deleteHistoryItem } from '../services/historyService';
import useTranslate from '../hooks/useTranslate';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App'; // Adjust path if needed

type HistoryScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'History'>;
};

const HistoryScreen = ({ navigation }: HistoryScreenProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { t, translateDisease, translateSeverity } = useTranslate();

  const loadHistory = async () => {
    setLoading(true);
    try {
      const historyItems = await getUserHistory();
      setHistory(historyItems);
    } catch (error) {
      console.error('Error loading history:', error);
      Alert.alert(t('common.error'), t('history.loadError'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadHistory();
  };

  const handleDeleteItem = (id: string) => {
    Alert.alert(
      t('history.deleteConfirmTitle'),
      t('history.deleteConfirmMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            const success = await deleteHistoryItem(id);
            if (success) {
              setHistory((prev) => prev.filter((item) => item.id !== id));
            } else {
              Alert.alert(t('common.error'), t('history.deleteError'));
            }
          },
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text style={styles.diseaseName}>{translateDisease(item.disease)}</Text>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => handleDeleteItem(item.id!)}
            style={styles.deleteButton}
          />
        </View>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('result.confidence')}:</Text>
            <Text style={styles.detailValue}>{item.confidence}%</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('result.severity')}:</Text>
            <Text style={styles.detailValue}>
              {translateSeverity(item.severity)}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('history.date')}:</Text>
            <Text style={styles.detailValue}>{formatDate(item.timestamp)}</Text>
          </View>
          
          {item.notes ? (
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>{t('history.notes')}:</Text>
              <Text style={styles.notesText}>{item.notes}</Text>
            </View>
          ) : null}
        </View>
      </Card.Content>
      
      <Card.Actions style={styles.cardActions}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Info', { disease: item.disease })}
          textColor="#4CAF50"
        >
          {t('common.moreInfo')}
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('history.title')}</Text>
      </View>
      
      {history.length === 0 && !loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('history.noHistory')}</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Camera')}
            style={styles.takePhotoButton}
            buttonColor="#4CAF50"
            icon="camera"
          >
            {t('common.takePicture')}
          </Button>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id || ''}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    margin: 0,
  },
  imageContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#555',
    width: 100,
  },
  detailValue: {
    color: '#333',
    flex: 1,
  },
  notesContainer: {
    marginTop: 8,
  },
  notesLabel: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
  },
  notesText: {
    color: '#333',
  },
  cardActions: {
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  takePhotoButton: {
    paddingHorizontal: 16,
  },
});

export default HistoryScreen;