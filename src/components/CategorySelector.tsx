import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'All', icon: '🍽️' },
  { id: '2', name: 'North Indian', icon: '🫓' },
  { id: '3', name: 'South Indian', icon: '🥘' },
  { id: '4', name: 'Biryani', icon: '🍚' },
  { id: '5', name: 'Street Food', icon: '🥡' },
  { id: '6', name: 'Sweets', icon: '🍯' },
];

interface CategorySelectorProps {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  categories?: Category[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategoryId,
  onSelectCategory,
  categories = DEFAULT_CATEGORIES,
}) => {
  return (
    <View>
      <View style={styles.categoriesHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {categories.map(category => {
          const isSelected = selectedCategoryId === category.id;
          return (
            <Pressable
              key={category.id}
              onPress={() => onSelectCategory(category.id)}
              style={({ pressed }) => [
                styles.categoryPill,
                isSelected && styles.categoryPillSelected,
                pressed && styles.categoryPillPressed
              ]}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                isSelected && styles.categoryTextSelected
              ]}>
                {category.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  )
}

export default CategorySelector

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: '700',
  },
  categoriesHeader: {
    marginBottom: 12,
  },
  categoriesScroll: {
    paddingBottom: 20,
    gap: 12,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  categoryPillSelected: {
    backgroundColor: '#0253ad',
    borderColor: '#0253ad',
  },
  categoryPillPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.97 }],
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  categoryText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
})
