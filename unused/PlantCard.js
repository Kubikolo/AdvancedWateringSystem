// components/PlantCard.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles, COLORS, SPACING, FONT_SIZES } from '../../styles/global';

const PlantCard = ({ plant, onSettingsPress, onPumpPress }) => {
  const { name, moisture, frequency, volumePerPump } = plant;
  const moistureColor =
    moisture > 75
      ? COLORS.green
      : moisture > 50
      ? COLORS.yellow
      : moisture > 25
      ? COLORS.orange
      : COLORS.red;

  return (
    <View style={styles.cardContainer}>
      {/* Plant name */}
      <Text style={styles.plantName}>{name}</Text>

      {/* Moisture level */}
      <Text style={[styles.infoText, { color: moistureColor }]}>
        Moisture: {moisture}%
      </Text>

      {/* Watering frequency */}
      <Text style={styles.infoText}>
        Water every: {frequency} day{frequency > 1 ? 's' : ''}
      </Text>

      {/* Volume per period */}
      <Text style={styles.infoText}>
        Volume per period: {volumePerPump} ml
      </Text>

      {/* Action buttons */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: SPACING.md,
          justifyContent: 'space-between',
        }}
      >
        <Pressable
          style={[styles.buttonSecondary, { flex: 1, marginRight: SPACING.sm }]}
          onPress={() => onSettingsPress(plant)}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonPrimary, { flex: 1, marginLeft: SPACING.sm }]}
          onPress={() => onPumpPress(plant)}
        >
          <Text style={styles.buttonText}>Pump Water</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PlantCard;
