import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList
} from 'react-native';

import React, { useState, useEffect } from 'react';
import { styles, SPACING, COLORS } from '../../styles/global';
import TankUsageCard from './TankUsageCard'
import { PLANTS } from '../../constants/dummyData';

const TankUsage = ({ tank, onClose, onSave }) => {

    const [name, setName] = useState('');
    const [originalName, setOriginalName] = useState('');
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        if (tank) {
        setName(tank.name);
        setOriginalName(tank.name);
        setIsModified(false);
        }
    }, [tank]);

    useEffect(() => {
        setIsModified(name !== originalName);
    }, [name, originalName]);

    const handleSave = () => {
        // Simulate saving action
        setOriginalName(name);
        setIsModified(false);
        onClose();
    };

    
    useEffect(() => {
          if (tank) {
            setName(tank.name);
          }
        }, [tank]);

    if (!tank) return null;

    return (
        <>
            <Text style={styles.label}>Tank Name</Text>
            <View style={{ flexDirection: 'row', marginBottom: SPACING.lg }}>
                <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                value={name}
                onChangeText={setName}
                placeholder="Enter tank name"
                placeholderTextColor={COLORS.mediumGray}
                />
                <Pressable
                style={[
                    styles.buttonPrimary,
                    {
                    backgroundColor: isModified
                        ? COLORS.buttonPrimary
                        : COLORS.primaryDisabled,
                    },
                ]}
                onPress={handleSave}
                disabled={!isModified}
                >
                <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
            
            <FlatList
                data={PLANTS.filter(plant => plant.tank === tank.id)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TankUsageCard plant={item} usage={Math.random()*100} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </>
    )
}

export default TankUsage