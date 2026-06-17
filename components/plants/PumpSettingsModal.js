  import React, { useState, useEffect, useRef } from 'react';
  import { Modal, View, Text, TextInput, Pressable } from 'react-native';
  import { styles, COLORS, SPACING } from '../../styles/global';
  import * as Progress from 'react-native-progress';
  import mqtt from 'mqtt';

  const PumpSettingsModal = ({ visible, plant, onClose, onPump }) => {
    const [duration, setDuration] = useState('3');
    const [progress, setProgress] = useState(0);
    const [isPumping, setIsPumping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const clientRef = useRef(null);
    const intervalRef = useRef(null);

    const brokerUrl = 'url';
    const mqttOptions = {
        username: 'username',
        password: 'password',
        clientId: `rn_pump_${Math.random().toString(16).substring(2, 10)}`,
    };

    useEffect(() => {
      if (visible) {
        console.log('Connecting to HiveMQ for live pump controls...');
        const client = mqtt.connect(brokerUrl, mqttOptions);
        clientRef.current = client;

        client.on('connect', () => {
            console.log('Live pump controller connected to HiveMQ!');
        });

        return () => {
            if (clientRef.current) {
                clientRef.current.end();
                console.log('Pump controller disconnected.');
            }
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }
    }, [visible]);

    const handlePump = () => {
      if (!plant) return;

      const intDuration = parseInt(duration, 10) || 5;

      if (clientRef.current && clientRef.current.connected) {
        const topic = 'garden/plant1/pump/trigger';
        
        clientRef.current.publish(topic, intDuration.toString(), { qos: 1 }, (err) => {
            if (err) console.error('Failed to send pump trigger:', err);
            else console.log(`Successfully sent duration value (${intDuration}) to ${topic}`);
        });
      } else {
          console.warn('MQTT client offline. Local animation running anyway.');
      }

      const pumpSettings = {
        plantId: plant.id,
        volume: parseInt(duration, 10),
      };

      onPump(pumpSettings);
      setIsPumping(true);
      startProgress();
    };

    const startProgress = () => {
      const fillTime = (Number(duration) || 5) * 1000;
      const steps = 40;
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
      setDuration('3');
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

            <Text style={styles.label}>Duration (s)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={duration}
              editable={!isPumping && !isComplete}
              onChangeText={setDuration}
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
