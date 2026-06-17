import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { COLORS, styles } from '../styles/global';

export default function FilterBar({ initialFilters = [], onSelectionChange }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilter = (item) => {
    const isSelected = selectedFilters.includes(item);
    const updated = isSelected
      ? selectedFilters.filter((f) => f !== item)
      : [item, ...selectedFilters];

    setSelectedFilters(updated);
    onSelectionChange?.(updated);
  };

  const allFilters = [
  ...selectedFilters
    .map((id) => initialFilters.find((f) => f.id === id))
    .filter(Boolean),
  ...initialFilters.filter((f) => !selectedFilters.includes(f.id)),
];

  const renderFilter = (item) => {
    const isSelected = selectedFilters.includes(item.id);

    return (
      <TouchableOpacity
        key={item}
        style={[styles.filterItem, isSelected && styles.selectedFilter]}
        onPress={() => toggleFilter(item.id)}
        activeOpacity={0.7}
      >
        <Text style={[styles.infoLabel, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
        {isSelected && (
          <Text style={styles.selectedText}>  ✕</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.filterContainer]}>
      <FlatList
        horizontal
        data={allFilters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderFilter(item)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
