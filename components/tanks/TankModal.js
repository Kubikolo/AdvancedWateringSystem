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
import {LOGS, PLANTS} from '../../constants/dummyData';
import TankUsage from './TankUsage'
import TankHistory from './TankHistory';

const TankModal = ({ visible, tank, onClose, onNameSave }) => {

    const [selectedTab, setSelectedTab] = useState('Usage');

    const handleClose = () => {
        setSelectedTab('Usage');
        onClose();
    };

    if (!tank) return null;

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <Pressable style={styles.overlay} onPress={handleClose}>
                <Pressable style={styles.modalContainer} onPress={() => {}}>
                    <Text style={[styles.title, {alignItems: 'center'}]}>
                        Tank #{tank.id}
                    </Text>

                    <Text style={styles.infoLabel}>
                        Predicted refill in:
                    </Text>

                    <Text style={styles.infoValue}>
                        3 days
                    </Text>

                    <TwoOptionToggle
                        optionA="Usage"
                        optionB="History"
                        onChange={(val) => setSelectedTab(val)}
                    />

                    {selectedTab === 'Usage' ? (
                        <TankUsage 
                            tank={tank}
                            onClose={handleClose}
                        />
                    ) : (
                        <TankHistory
                            logs={LOGS.filter(log => {
                                const plant = PLANTS.find(plant => plant.id === log.id);
                                return plant && plant.tank === tank.id;
                                })} 
                            onClose={handleClose}
                        />
                    )}

                    <Pressable style={[styles.buttonCancel, {marginTop: 20}]} onPress={handleClose}>
                        <Text style={styles.buttonText}>Exit</Text>
                    </Pressable>
                    
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default TankModal