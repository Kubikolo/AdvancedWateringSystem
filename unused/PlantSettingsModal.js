import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { styles, COLORS, SPACING, FONT_SIZES } from '../styles/global';

const PlantSettingsModal = ({ visible, plant, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [moisture, setMoisture] = useState('');
  const [volumePerPump, setVolumePerPump] = useState('');

  useEffect(() => {
    if (plant) {
      setName(plant.name);
      setFrequency(String(plant.frequency));
      setMoisture(String(plant.moisture));
      setVolumePerPump(String(plant.volumePerPump || ''));
    }
  }, [plant]);

  const handleSave = () => {
    const updatedPlant = {
      ...plant,
      name: name.trim() || plant.name,
      frequency: parseInt(frequency, 10),
      moisture: parseInt(moisture, 10),
      volumePerPump: parseInt(volumePerPump, 10),
    };
    onSave(updatedPlant);
    onClose();
  };

  if (!plant) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={[styles.title, { marginBottom: SPACING.lg }]}>
            Edit Plant
          </Text>

          <Text style={styles.label}>Plant Name</Text>
          <TextInput
            style={inputStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter plant name"
            placeholderTextColor={COLORS.mediumGray}
          />

          <Text style={[styles.label, { marginTop: SPACING.md }]}>
            Watering Frequency (days)
          </Text>
          <TextInput
            style={inputStyles.input}
            keyboardType="numeric"
            value={frequency}
            onChangeText={setFrequency}
          />

          <Text style={[styles.label, { marginTop: SPACING.md }]}>
            Water Volume Per Pump (ml)
          </Text>
          <TextInput
            style={inputStyles.input}
            keyboardType="numeric"
            value={volumePerPump}
            onChangeText={setVolumePerPump}
          />

          <View style={inputStyles.buttonRow}>
            <Pressable style={[styles.buttonCancel, { marginRight : SPACING.md }]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.buttonPrimary} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const inputStyles = {
  input: {
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    borderRadius: 8,
    padding: SPACING.sm,
    fontSize: FONT_SIZES.medium,
    color: COLORS.white,
    backgroundColor: COLORS.inputBackground,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SPACING.lg,
  },
};

export default PlantSettingsModal;
