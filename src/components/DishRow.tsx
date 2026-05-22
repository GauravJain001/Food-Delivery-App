import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dish } from '../constants/restaurants'

interface DishRowProps {
  dish: Dish;
  onAddPress: () => void;
}

const DishRow: React.FC<DishRowProps> = ({ dish, onAddPress }) => {
  return (
    <View style={styles.dishRow}>
      <View style={styles.dishTextColumn}>
        <Text style={styles.dishName}>{dish.name}</Text>
        <Text style={styles.dishDescription} numberOfLines={3}>
          {dish.description}
        </Text>
        <Text style={styles.dishPrice}>₹{dish.price}</Text>
      </View>
      <View style={styles.dishImageColumn}>
        <Image source={{ uri: dish.image }} style={styles.dishImage} />
        <Pressable 
          onPress={onAddPress}
          style={({ pressed }) => [
            styles.addBtn,
            pressed && styles.addBtnPressed
          ]}
        >
          <Text style={styles.addBtnText}>+ ADD</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default DishRow

const styles = StyleSheet.create({
  dishRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishTextColumn: {
    flex: 1,
    marginRight: 14,
  },
  dishName: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '700',
  },
  dishDescription: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    marginTop: 4,
  },
  dishPrice: {
    color: '#0253ad',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },
  dishImageColumn: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishImage: {
    width: 92,
    height: 92,
    borderRadius: 12,
  },
  addBtn: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addBtnPressed: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    transform: [{ scale: 0.95 }],
  },
  addBtnText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '800',
  },
})
