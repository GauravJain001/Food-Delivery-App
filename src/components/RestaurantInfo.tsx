import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface RestaurantInfoProps {
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  popular: boolean;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({
  name,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
  popular,
}) => {
  return (
    <View style={styles.infoCard}>
      <View style={styles.popularRow}>
        <Text style={styles.cuisineText}>{cuisine}</Text>
        {popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>🔥 Popular</Text>
          </View>
        )}
      </View>

      <Text style={styles.restaurantName}>{name}</Text>
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Ionicons name="star" size={18} color="#FFB000" />
          <Text style={styles.metricValue}>{rating}</Text>
          <Text style={styles.metricLabel}>Rating</Text>
        </View>
        <View style={styles.metricItemDivider} />
        <View style={styles.metricItem}>
          <Ionicons name="time-outline" size={18} color="#0253ad" />
          <Text style={styles.metricValue}>{deliveryTime}</Text>
          <Text style={styles.metricLabel}>Speed</Text>
        </View>
        <View style={styles.metricItemDivider} />
        <View style={styles.metricItem}>
          <Ionicons name="bicycle-outline" size={18} color="#10B981" />
          <Text style={styles.metricValue}>
            {deliveryFee === 'Free' ? 'Free' : deliveryFee}
          </Text>
          <Text style={styles.metricLabel}>Delivery</Text>
        </View>
      </View>
    </View>
  )
}

export default RestaurantInfo

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  popularRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cuisineText: {
    color: '#0253ad',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  popularBadge: {
    backgroundColor: '#FFEFEF',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFA5A5',
  },
  popularBadgeText: {
    color: '#EA4335',
    fontSize: 10,
    fontWeight: '700',
  },
  restaurantName: {
    color: '#1E293B',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    color: '#1E293B',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  metricLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  metricItemDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E2E8F0',
  },
})
