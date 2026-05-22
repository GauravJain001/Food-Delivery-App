import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '@/store/store'

interface HomeHeaderProps {
  location?: string;
  onAvatarPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  location = '123 random address',
  onAvatarPress,
}) => {
  const navigation = useNavigation<any>();
  const { avatarUrl, getCartCount } = useStore();
  const cartCount = getCartCount();

  const handleAvatarPress = () => {
    if (onAvatarPress) {
      onAvatarPress();
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.userBar}>
      <View style={styles.leftCol}>
        <Text style={styles.locationLabel}>DELIVER TO 📍</Text>
        <Text style={styles.locationValue} numberOfLines={1}>{location}</Text>
      </View>
      
      <View style={styles.rightActionsRow}>
        <Pressable 
          onPress={() => navigation.navigate('Cart')}
          style={({ pressed }) => [
            styles.actionCircleBtn,
            pressed && styles.btnPressed
          ]}
        >
          <Ionicons name="bag-handle-outline" size={22} color="#1E293B" />
          {cartCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </Pressable>

        <Pressable 
          onPress={handleAvatarPress} 
          style={({ pressed }) => [
            styles.avatarBtn,
            pressed && styles.avatarBtnPressed
          ]}
        >
          <Image 
            source={{ uri: avatarUrl }} 
            style={styles.avatarImage} 
          />
        </Pressable>
      </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  userBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  leftCol: {
    flex: 1,
    marginRight: 16,
  },
  locationLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  locationValue: {
    color: '#1E293B',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 2,
  },
  rightActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginRight: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
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
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#0253ad',
    overflow: 'hidden',
    shadowColor: '#0253ad',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarBtnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  btnPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
})
