import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles, COLORS, SPACING, FONT_SIZES } from '../styles/global';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ErrorCard = ({ error }) => {
    return (
        <View   
            style={[styles.plantCardContainer, {marginBottom : 0, marginTop: SPACING.md, backgroundColor: COLORS.red}]}
            activeOpacity={0.5} 
            onPress={() => onCardPress(plant)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome
                    name="warning"
                    size={14}
                    color="black"
                    style={{ marginRight: 8 }}
                />
                <Text style={{ fontWeight: '600', fontSize: 14 }}>
                    There is no error. This is just a test! What if the message was longer though?
                </Text>
            </View>
        </View>

    )
}

export default ErrorCard;