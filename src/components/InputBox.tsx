import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'

interface InputBoxProps {
  heading: string;
  icon?: string;
  placeholder: string;
  hidden?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ heading, icon, placeholder, hidden, value, onChangeText }) => {

    const [passwordVisible, setPasswordVisible] = useState(!!hidden);
    const [localText, setLocalText] = useState("");

    const isControlled = value !== undefined;
    const currentText = isControlled ? value : localText;

    const handleTextChange = (val: string) => {
        if (!isControlled) {
            setLocalText(val);
        }
        if (onChangeText) {
            onChangeText(val);
        }
    };

    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>{heading}</Text>
            <View
                style={[styles.container,]}
            >
                {icon && (
                    <Feather
                        name={icon as any}
                        size={20}
                        color={'#0253ad'}
                        style={styles.leftIcon}
                    />
                )}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={passwordVisible}
                    value={currentText}
                    onChangeText={handleTextChange}
                    style={styles.textInput}
                    autoCapitalize="none"
                />
                {hidden && (
                    <Pressable
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        style={styles.eyeButton}
                    >
                        <Feather
                            name={passwordVisible ? 'eye-off' : 'eye'}
                            size={20}
                            color="#94A3B8"
                        />
                    </Pressable>
                )}
            </View>
        </View>
    )
}

export default InputBox

const styles = StyleSheet.create({
    wrapper: {
        gap: 8,
        width: '100%',
    },
    heading: {
        color: '#475569',
        fontSize: 14,
        fontWeight: '600',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 56,
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
    },
    containerFocused: {
        borderColor: '#0253ad',
        backgroundColor: '#FFFFFF',

        shadowColor: '#0253ad',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    leftIcon: {
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        height: '100%',
        color: '#0F172A',
        fontSize: 15,
        fontWeight: '500',
        padding: 0,
    },
    eyeButton: {
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})