import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../../styles/global';

const PlantHistoryCard = ({ plantLog }) => {
  if (!plantLog) return null;

  return (
    <Pressable>
        <View style={[styles.plantCardContainer, styles.plantHistoryCard]}>
        <Text style={styles.plantName}>{plantLog.datetime}</Text>
        <View>
            <Text style={styles.infoText}>Volume: {plantLog.volume}</Text>
        </View>
        </View>
    </Pressable>
  );
};

export default PlantHistoryCard;
