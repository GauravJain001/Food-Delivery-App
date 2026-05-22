import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface PromoBannerProps {
  title?: string;
  subtitle?: string;
  btnText?: string;
  onBtnPress?: () => void;
  imageUrl?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title = '50% OFF',
  subtitle = 'On your first order',
  btnText = 'Claim Now',
  onBtnPress,
  imageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300',
}) => {
  return (
    <View style={styles.promoBanner}>
      <View style={styles.promoTextContainer}>
        <Text style={styles.promoTitle}>{title}</Text>
        <Text style={styles.promoSubtitle}>{subtitle}</Text>
        <Pressable 
          onPress={onBtnPress} 
          style={({ pressed }) => [
            styles.promoBtn,
            pressed && styles.promoBtnPressed
          ]}
        >
          <Text style={styles.promoBtnText}>{btnText}</Text>
        </Pressable>
      </View>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.promoImage} 
      />
    </View>
  )
}

export default PromoBanner

const styles = StyleSheet.create({
  promoBanner: {
    flexDirection: 'row',
    backgroundColor: '#0253ad',
    borderRadius: 18,
    padding: 20,
    height: 140,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    shadowColor: '#0253ad',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  promoTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
  promoSubtitle: {
    color: '#E0F2FE',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 10,
  },
  promoBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  promoBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.95 }],
  },
  promoBtnText: {
    color: '#0253ad',
    fontSize: 12,
    fontWeight: '700',
  },
  promoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 15,
  },
})
