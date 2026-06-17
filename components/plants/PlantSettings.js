import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable
} from 'react-native';

import React, { useState, useEffect, useRef } from 'react';
import { styles, SPACING, COLORS } from '../../styles/global';
import TwoOptionToggle from '../TwoOptionToggleTest';
import mqtt from 'mqtt';

const PlantSettings = ({ visible, plant, onClose, onSave }) => {

    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState('');
    const [wateringDuration, setWateringDuration] = useState('');
    const clientRef = useRef(null);

    const brokerUrl = 'url';
    const mqttOptions = {
        username: 'username',
        password: 'password',
        clientId: `rn_app_${Math.random().toString(16).substring(2, 10)}`,
    };

    useEffect(() => {
        if (visible) {
            console.log('Connecting to HiveMQ Cloud via WebSockets...');
            const client = mqtt.connect(brokerUrl, mqttOptions);
            clientRef.current = client;

            client.on('connect', () => {
                console.log('React Native successfully connected to HiveMQ!');
            });

            client.on('error', (err) => {
                console.error('HiveMQ Connection Error:', err);
            });

            return () => {
                if (clientRef.current) {
                    clientRef.current.end();
                    console.log('Disconnected from HiveMQ');
                }
            };
        }
    }, [visible]);

    useEffect(() => {
      if (plant) {
        setName(plant.name);
        setFrequency(String(plant.frequency));
        setWateringDuration(String(plant.wateringDuration));
      }
    }, [plant]);
    
    const handleSave = () => {

        const updatedPlant = {
            ...plant,
            name: name.trim() || plant.name,
            frequency: parseInt(frequency),
            wateringDuration: parseInt(wateringDuration),
        };
        onSave(updatedPlant);
        // publish to mq
        const parsedFrequencyDays = parseInt(frequency) || 0;
        const parsedDurationSeconds = parseInt(wateringDuration) || 0;

        const periodSeconds = parsedFrequencyDays * 24 * 60 * 60;

        const mqttPayload = {
            period_seconds: periodSeconds,
            duration_seconds: parsedDurationSeconds
        };

        if (clientRef.current && clientRef.current.connected) {
            const topic = 'garden/plant1/settings';
            clientRef.current.publish(
                topic, 
                JSON.stringify(mqttPayload), 
                { qos: 1 }, 
                (err) => {
                    if (err) console.error('Failed to publish settings changes:', err);
                    else console.log('Successfully updated ESP32 configuration via HiveMQ:', mqttPayload);
                }
            );
        } else {
            console.warn('Unable to sync changes: MQTT client is currently offline.');
        }

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
                Pumping Duration (s)
            </Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={wateringDuration}
                onChangeText={setWateringDuration}
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