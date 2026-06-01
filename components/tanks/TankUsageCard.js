import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, styles, FONT_SIZES, SPACING } from '../../styles/global';

const TankUsageCard = ({ plant, usage }) => {
  if (!plant) return null;

  const usagePercentage = Math.min(Math.max(usage, 0), 100);

  return (
    <View style={localStyles.cardContainer}>
      <View style={[localStyles.fillOverlay, { width: `${usagePercentage}%` }]} />

      {/* Content */}
      <View style={localStyles.content}>
        <Text style={localStyles.text}>{plant.name}</Text>
        <Text style={localStyles.text}>{usagePercentage.toFixed(0)}%</Text>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  cardContainer: {
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.inputBackground,
    elevation: 8,
    overflow: 'hidden',
    marginVertical: 8,
    // position: 'relative',
    justifyContent: 'center',
  },
  fillOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.waterBlue,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  text: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default TankUsageCard;
