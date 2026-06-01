import React from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { styles, COLORS, SPACING, FONT_SIZES } from '../../styles/global';
import {TANKS} from '../../constants/dummyData'

const PlantCard = ({ plant, onCardPress, onPumpPress, emergency }) => {
    const moistureColor =
        plant.moisture > 75
        ? COLORS.green
        : plant.moisture > 50
        ? COLORS.yellow
        : plant.moisture > 25
        ? COLORS.orange
        : COLORS.red;
    
    return (
        <TouchableOpacity style={styles.plantCardContainer} activeOpacity={0.5} onPress={() => onCardPress(plant)}>
            <Text style={styles.plantName}>{plant.name}</Text>

            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tank:</Text>
                <Text style={styles.infoValue}>{TANKS.find(t => t.id === plant.tank).name}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Moisture:</Text>
                <Text style={[styles.infoValue, { color: moistureColor }]}>{plant.moisture}%</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Water every:</Text>
                <Text style={[styles.infoValue, { fontWeight: 'bold' }]}>
                {plant.frequency} day{plant.frequency > 1 ? 's' : ''}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Volume:</Text>
                <Text style={[styles.infoValue, { fontWeight: 'bold' }]}>{plant.volumeMl} ml</Text>
            </View>

            <Pressable
                style={[styles.buttonPrimary, { marginTop: SPACING.sm }, emergency && {backgroundColor: COLORS.primaryDisabled}]}
                onPress={!emergency ? () => onPumpPress(plant) : () => {}}
            >
                <Text style={styles.buttonText}>Pump water</Text>
            </Pressable>
            </TouchableOpacity>

    )
}

export default PlantCard;