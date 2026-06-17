import {
  View,
  Text,
  Pressable,
  Modal
} from 'react-native';
import React, { useState } from 'react';
import { styles, SPACING, COLORS } from '../../styles/global';
import DateTimePicker from '@react-native-community/datetimepicker';

const GeneralSettingsModal = ({ visible, onClose, onSave }) => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setTime(selectedDate);
    }
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
        <Pressable style={styles.overlay} onPress={onClose}>
            <Pressable style={styles.modalContainer} onPress={() => {}}>
                <Text style={styles.label}>Watering Time</Text>
      
                <Pressable onPress={showTimePicker} style={[styles.input, { justifyContent: 'center' }]}>
                    <Text style={{color: COLORS.white}}>{formatTime(time)}</Text>
                </Pressable>

                {showPicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        display="default"
                        onChange={onChange}
                    />
                )}

                <View style={styles.buttonRow}>
                    <Pressable
                    style={[styles.buttonCancel, { marginRight: SPACING.md }]}
                    onPress={onClose}
                    >
                    <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                    <Pressable
                    style={styles.buttonPrimary}
                    onPress={() => onSave(time)}
                    >
                    <Text style={styles.buttonText}>Save</Text>
                    </Pressable>
                </View>
            </Pressable>
        </Pressable>
    </Modal>
  );
};

export default GeneralSettingsModal;
