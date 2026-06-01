// components/TwoOptionToggle.js

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../styles/global';

const TwoOptionToggle = ({
  optionA = 'Option A',
  optionB = 'Option B',
  onChange,
  initial = optionA,
}) => {
  const [selected, setSelected] = useState(initial);

  const handleSelect = (option) => {
    setSelected(option);
    if (onChange) onChange(option);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.option,
          styles.left,
          selected === optionA ? styles.selected : styles.unselected,
        ]}
        onPress={() => handleSelect(optionA)}
      >
        <Text style={selected === optionA ? styles.selectedText : styles.unselectedText}>
          {optionA}
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.option,
          styles.right,
          selected === optionB ? styles.selected : styles.unselected,
        ]}
        onPress={() => handleSelect(optionB)}
      >
        <Text style={selected === optionB ? styles.selectedText : styles.unselectedText}>
          {optionB}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'stretch',
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    marginVertical: SPACING.md,
  },
  option: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  right: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  selected: {
    backgroundColor: COLORS.buttonPrimary,
  },
  unselected: {
    backgroundColor: 'transparent',
  },
  selectedText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.medium,
  },
  unselectedText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.medium,
  },
});

export default TwoOptionToggle;
