  import React, { useState, useEffect, useRef } from 'react';
  import { Modal, View, Text, TextInput, Pressable } from 'react-native';
  import { styles, COLORS, SPACING } from '../../styles/global';
  import * as Progress from 'react-native-progress';

  const PumpSettingsModal = ({ visible, plant, onClose, onPump }) => {
    const [volume, setVolume] = useState('100');
    const [progress, setProgress] = useState(0);
    const [isPumping, setIsPumping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef(null);

    const handlePump = () => {
      if (!plant) return;

      const pumpSettings = {
        plantId: plant.id,
        volume: parseInt(volume, 10),
      };

      onPump(pumpSettings);
      setIsPumping(true);
      startProgress();
    };

    const startProgress = () => {
      const pumpSpeed = 10;
      const fillTime = Number(volume) * pumpSpeed; // total duration in ms
      const steps = 100;
      const step = 1 / steps;
      const intervalTime = fillTime / steps;
      let currentProgress = 0;

      intervalRef.current = setInterval(() => {
        currentProgress += step;
        setProgress(Math.min(1, currentProgress));

        if (currentProgress >= 1) {
          clearInterval(intervalRef.current);
          setIsComplete(true);
        }
      }, intervalTime);
    };

    const resetModal = () => {
      setProgress(0);
      setVolume('100');
      setIsPumping(false);
      setIsComplete(false);
      onClose();
    };

    if (!plant) return null;

    return (
      <Modal visible={visible} animationType="fade" transparent>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.modalContainer} onPress={() => {}}>
            <Text style={[styles.title, { marginBottom: SPACING.lg }]}>
              Pump Settings: {plant.name}
            </Text>

            <Text style={styles.label}>Volume (ml)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={volume}
              editable={!isPumping && !isComplete}
              onChangeText={setVolume}
              placeholder="Enter volume"
              placeholderTextColor={COLORS.mediumGray}
            />

            {isPumping && (
              <Progress.Bar
                style={styles.pumpProgressBar}
                progress={progress}
                width={280}
                height={20}
                borderRadius={10}
              />
            )}

            {isComplete && (
              <Text
                style={{
                  color: COLORS.green,
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: SPACING.lg,
                }}
              >
                Pump Complete!
              </Text>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: SPACING.lg }}>

              {!isPumping && (
                <>
                  <Pressable style={styles.buttonCancel} onPress={onClose}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.buttonPrimary, { marginLeft: SPACING.md }]}
                    onPress={handlePump}
                  >
                    <Text style={styles.buttonText}>Pump</Text>
                  </Pressable>
                </>
              )}

              {isComplete && (
                <Pressable
                  style={[styles.buttonCancel, { alignSelf: 'center' }]}
                  onPress={resetModal}
                >
                  <Text style={styles.buttonText}>Exit</Text>
                </Pressable>
              )}

            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  };

  export default PumpSettingsModal;
