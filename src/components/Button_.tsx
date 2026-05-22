import { StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'

interface ButtonProps {
  heading: string;
  onPress: () => void;
  loading?: boolean;
}

const Button_: React.FC<ButtonProps> = ({ heading, onPress, loading = false }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
        loading && styles.containerDisabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.heading}>{heading}</Text>
      )}
    </Pressable>
  )
}

export default Button_

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#0253ad',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#0253ad',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  containerPressed: {
    backgroundColor: '#013e85',
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.1,
  },
  containerDisabled: {
    backgroundColor: '#93c5fd',
  },
  heading: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})