import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Restaurant } from '../constants/restaurants'

interface RestaurantCardProps {
  item: Restaurant;
  onPress?: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ item, onPress }) => {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.card, 
        pressed && styles.cardPressed
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        {item.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>🔥 Popular</Text>
          </View>
        )}
        <View style={styles.deliveryTimeBadge}>
          <Text style={styles.deliveryTimeText}>⏱️ {item.deliveryTime}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.restaurantName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FFB000" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <Text style={styles.cuisineText}>{item.cuisine}</Text>

        <View style={styles.cardFooter}>
          <View style={styles.tagRow}>
            {item.tags.slice(0, 2).map((tag, idx) => (
              <View key={idx} style={styles.tagBadge}>
                <Text style={styles.tagBadgeText}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.deliveryFeeText}>
            {item.deliveryFee === 'Free' ? 'Free Delivery' : `Delivery: ${item.deliveryFee}`}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default RestaurantCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginHorizontal: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.96,
  },
  imageContainer: {
    height: 170,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    height: '100%',
    width: '100%',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFEFEF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFA5A5',
  },
  popularBadgeText: {
    color: '#EA4335',
    fontSize: 11,
    fontWeight: '700',
  },
  deliveryTimeBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  deliveryTimeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#1E293B',
    fontSize: 14,
    fontWeight: '700',
  },
  cuisineText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
  },
  tagBadge: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tagBadgeText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  deliveryFeeText: {
    color: '#1E293B',
    fontSize: 12,
    fontWeight: '600',
  },
})
