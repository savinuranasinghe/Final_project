import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

type ResultImageCardProps = {
  imageUri: string;
};

const ResultImageCard = ({ imageUri }: ResultImageCardProps) => {
  return (
    <Card style={styles.imageCard}>
      <Card.Cover source={{ uri: imageUri }} style={styles.image} />
    </Card>
  );
};

const styles = StyleSheet.create({
  imageCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    height: 250,
    backgroundColor: '#e0e0e0',
  },
});

export default ResultImageCard;