import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable
} from 'react-native';

import { styles, SPACING, COLORS } from '../../styles/global';

const ConfirmationModal = ({ visible, onNo, onYes, emergency }) => {

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <Pressable style={styles.overlay} onPress={onNo}>
                <Pressable style={styles.modalContainer} onPress={() => {}}>
                    <Text style={[styles.title, {marginBottom: SPACING.md}]}>
                        Are you sure?
                    </Text>
                    {!emergency ? (
                        <Text style={styles.label}>
                            Doing this will cease all operations!
                        </Text>
                    ) : (
                        <Text style={styles.label}>
                            Doing this will resume all operations!
                        </Text>             
                    )}

                    <View style={[styles.buttonRow, {justifyContent: "space-between"}]}>
                        <Pressable style={[styles.buttonCancel, { marginRight : SPACING.md }]} onPress={onNo}>
                            <Text style={styles.buttonText}>No</Text>
                        </Pressable>
                        <Pressable style={styles.buttonPrimary} onPress={onYes}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </Pressable>
                    </View>
                    
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default ConfirmationModal