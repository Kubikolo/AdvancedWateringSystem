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
import PlantSettings from './PlantSettings';
import PlantHistory from './PlantHistory';
import {LOGS} from '../../constants/dummyData';

const PlantModal = ({ visible, plant, onClose, onSave }) => {

    const [selectedTab, setSelectedTab] = useState('Settings');

    const handleClose = () => {
        setSelectedTab('Settings');
        onClose();
    };

    if (!plant) return null;

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <Pressable style={styles.overlay} onPress={handleClose}>
                <Pressable style={styles.modalContainer} onPress={() => {}}>
                    <Text style={[styles.title, {alignItems: 'center'}]}>
                        Plant #{plant.id}
                    </Text>

                    <Text style={styles.infoLabel}>
                        Next scheduled pump:
                    </Text>

                    <Text style={styles.infoValue}>
                        01.06.2025 12:30
                    </Text>

                    <TwoOptionToggle
                        optionA="Settings"
                        optionB="History"
                        onChange={(val) => setSelectedTab(val)}
                    />

                    {selectedTab === 'Settings' ? (
                    <PlantSettings
                        visible={visible}
                        plant={plant}
                        onClose={onClose}
                        onSave={onSave}
                    />
                    ) : (
                        <PlantHistory 
                        logs={LOGS.filter(item => item.id === plant.id)} 
                        onClose={handleClose}/>
                    )}
                    
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default PlantModal