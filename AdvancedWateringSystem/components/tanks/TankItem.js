// components/TankItem.js
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Touchable, TouchableOpacity } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { COLORS, SPACING, FONT_SIZES } from '../../styles/global';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_MARGIN = SPACING.md * 2; // FlatList paddingHorizontal is SPACING.md each side
const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN;
const CARD_HEIGHT = 140;
const TOP_SECTION_HEIGHT = CARD_HEIGHT * 0.28;
const WATER_TOP_MAX = CARD_HEIGHT * 0.9;
const WATER_TOP_MIN = CARD_HEIGHT * 0.5;

const BORDER_RADIUS = 14;

const TankItem = ({ tank, onCardPress}) => {
  const { name, remaining, capacity } = tank; // level: 0-100
  const level = Math.round((remaining / capacity) * 100); // Example: 20L max

  // Calculate water top position (lower = more full)
  const waterTop =
    level === 0
      ? CARD_HEIGHT
      : WATER_TOP_MAX - ((WATER_TOP_MAX - WATER_TOP_MIN) * level) / 100;

  const showWaves = level > 10;

  // Animated wave phase
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);

  useEffect(() => {
    let running = true;
    function animate() {
      if (!running) return;
      phaseRef.current += 0.02;
      setPhase(phaseRef.current);
      requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, []);

  // Generate wavy path for water surface
  const getWavePath = () => {
    const amplitude = 7;
    const frequency = 2;
    const width = CARD_WIDTH;
    const y = waterTop;
    let path = `M0,${y}`;
    for (let x = 0; x <= width; x += 1) {
      const waveY =
        y +
        Math.sin((x / width) * Math.PI * frequency + phase) * amplitude;
      path += ` L${x},${waveY}`;
    }
    path += ` L${width},${CARD_HEIGHT} L0,${CARD_HEIGHT} Z`;
    return path;
  };

  return (
    <TouchableOpacity style={[localStyles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]} activeOpacity={0.8} onPress={() => onCardPress(tank)}>
      {/* Top section */}
      <View style={localStyles.topSection}>
        <Text style={localStyles.tankName} numberOfLines={1}>{name}</Text>
        <View style={localStyles.tankInfoContainer}>
          <Text style={localStyles.tankInfo}>{level}%</Text>
          <Text style={localStyles.tankInfo}>{remaining} / {capacity} L</Text>
        </View>
      </View>

      {/* Water visualization container with borderRadius and overflow hidden */}
      <View style={localStyles.waterContainer}>
        <Svg width={CARD_WIDTH} height={CARD_HEIGHT}>
          {level > 0 && showWaves && (
            <Path
              d={getWavePath()}
              fill={COLORS.waterBlue}
              opacity={0.8}
            />
          )}

          {level > 0 && !showWaves && (
            <Rect
              x="0"
              y={waterTop}
              width={CARD_WIDTH}
              height={CARD_HEIGHT - waterTop}
              fill={COLORS.waterBlue}
              opacity={0.8}
            />
          )}
        </Svg>

        {level === 0 && (
          <View style={localStyles.emptyOverlay}>
            <Text style={localStyles.emptyText}>Empty</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
    marginHorizontal: SPACING.md,
    overflow: 'hidden', // clip children including water visualization
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },

  topSection: {
    height: TOP_SECTION_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  tankName: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'left',
  },
  tankInfoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    minWidth: 60,
  },
  tankInfo: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginTop: 2,
  },
  waterContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden', // key to clip the SVG with rounded corners
    zIndex: 1,
  },
  emptyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    opacity: 0.7,
  },
});

export default TankItem;
