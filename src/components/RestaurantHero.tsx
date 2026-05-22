import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '@/store/store'

interface RestaurantHeroProps {
  imageUri: string;
  onBackPress: () => void;
}

const RestaurantHero: React.FC<RestaurantHeroProps> = ({ imageUri, onBackPress }) => {
  const navigation = useNavigation<any>();
  const { getCartCount } = useStore();
  const cartCount = getCartCount();

  return (
    <View style={styles.heroContainer}>
      <Image source={{ uri: imageUri }} style={styles.heroImage} />
      <View style={styles.overlay} />
      <SafeAreaView edges={['top']} style={styles.headerActions}>
        <Pressable 
          onPress={onBackPress} 
          style={({ pressed }) => [
            styles.backBtnCircle,
            pressed && styles.btnPressed
          ]}
        >
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </Pressable>

        <Pressable 
          onPress={() => navigation.navigate('Cart')} 
          style={({ pressed }) => [
            styles.backBtnCircle,
            pressed && styles.btnPressed
          ]}
        >
          <Ionicons name="bag-handle" size={22} color="#1E293B" />
          {cartCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </Pressable>
      </SafeAreaView>
    </View>
  )
}

export default RestaurantHero

const styles = StyleSheet.create({
  heroContainer: {
    height: 240,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  headerActions: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  backBtnCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.95 }],
  },
  badgeContainer: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EA4335',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
})
