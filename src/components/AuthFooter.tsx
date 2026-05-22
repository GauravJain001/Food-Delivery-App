import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface AuthFooterProps {
  text: string;
  actionText: string;
  onActionPress: () => void;
  onGooglePress?: () => void;
  onApplePress?: () => void;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ text, actionText, onActionPress, onGooglePress, onApplePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or continue with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialRow}>
        <Pressable
          onPress={onGooglePress}
          style={({ pressed }) => [
            styles.socialBtn,
            pressed && styles.socialBtnPressed,
          ]}
        >
          <FontAwesome name="google" size={24} color="#EA4335" />
        </Pressable>

        <Pressable
          onPress={onApplePress}
          style={({ pressed }) => [
            styles.socialBtn,
            pressed && styles.socialBtnPressed,
          ]}
        >
          <FontAwesome name="apple" size={24} color="#000000" />
        </Pressable>
      </View>
      <View style={styles.redirectRow}>
        <Text style={styles.redirectText}>{text}</Text>
        <Pressable onPress={onActionPress}>
          <Text style={styles.redirectLink}>{actionText}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default AuthFooter

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    gap: 25,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
  },
  socialBtn: {
    flex: 1,
    maxWidth: 150,
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  socialBtnPressed: {
    backgroundColor: '#EDF2F7',
    borderColor: '#CBD5E1',
    transform: [{ scale: 0.98 }],
  },
  redirectRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  redirectText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  redirectLink: {
    color: '#0253ad',
    fontSize: 14,
    fontWeight: '700',
  },
})