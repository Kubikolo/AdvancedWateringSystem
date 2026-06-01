import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable
} from 'react-native';

import React, { useState, useEffect } from 'react';
import { styles, SPACING, COLORS } from '../../styles/global';
import TwoOptionToggle from '../TwoOptionToggleTest';

const PlantSettings = ({ visible, plant, onClose, onSave }) => {

    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState('');
    const [volumeMl, setVolumeMl] = useState('');

    useEffect(() => {
      if (plant) {
        setName(plant.name);
        setFrequency(String(plant.frequency));
        setVolumeMl(String(plant.volumeMl));
      }
    }, [plant]);
    
    const handleSave = () => {
        const updatedPlant = {
            ...plant,
            name: name.trim() || plant.name,
            frequency: parseInt(frequency),
            volumeMl: parseInt(volumeMl),
        };
        onSave(updatedPlant);
        onClose();
    };

    if (!plant) return null;

    return (
        <>
            <Text style={styles.label}>Plant Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter plant name"
                placeholderTextColor={COLORS.mediumGray}
            />

            <Text style={[styles.label, { marginTop: SPACING.md }]}>
                Watering Frequency (days)
            </Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={frequency}
                onChangeText={setFrequency}
            />

            <Text style={[styles.label, { marginTop: SPACING.md }]}>
                Water Volume Per Pump (ml)
            </Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={volumeMl}
                onChangeText={setVolumeMl}
            />

            <View style={styles.buttonRow}>
                <Pressable style={[styles.buttonCancel, { marginRight : SPACING.md }]} onPress={onClose}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.buttonPrimary} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </>
    )
}

export default PlantSettings