import { FlatList, Image, Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useStore } from '@/store/store'
import { Dish } from '@/constants/restaurants'

interface SearchResultItem {
  dish: Dish;
  restaurantId: string;
  restaurantName: string;
}

const POPULAR_TAGS = ['Burgers', 'Pizza', 'Sushi', 'Salads', 'Pasta', 'Desserts'];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { restaurants, addToCart, getCartCount } = useStore();

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
  };

  const searchResults: SearchResultItem[] = [];
  
  if (searchQuery.trim().length > 0) {
    const query = searchQuery.toLowerCase().trim();
    restaurants.forEach(restaurant => {
      restaurant.menu.forEach(dish => {
        const matchesDishName = dish.name.toLowerCase().includes(query);
        const matchesDishDesc = dish.description.toLowerCase().includes(query);
        const matchesCategory = dish.category.toLowerCase().includes(query);
        const matchesRestaurant = restaurant.name.toLowerCase().includes(query);

        if (matchesDishName || matchesDishDesc || matchesCategory || matchesRestaurant) {
          searchResults.push({
            dish,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
          });
        }
      });
    });
  }

  const renderResultItem = ({ item }: { item: SearchResultItem }) => {
    return (
      <View style={styles.resultCard}>
        <Image source={{ uri: item.dish.image }} style={styles.dishImage} />
        
        <View style={styles.dishDetails}>
          <View style={styles.restaurantNameRow}>
            <Ionicons name="restaurant-outline" size={12} color="#0253ad" />
            <Text style={styles.restaurantNameText}>{item.restaurantName}</Text>
          </View>
          
          <Text style={styles.dishName}>{item.dish.name}</Text>
          <Text style={styles.dishDescription} numberOfLines={2}>
            {item.dish.description}
          </Text>
          <Text style={styles.dishPrice}>₹{item.dish.price}</Text>
        </View>

        <Pressable 
          onPress={() => addToCart(item.dish, item.restaurantId, item.restaurantName)}
          style={({ pressed }) => [
            styles.addBtn,
            pressed && styles.addBtnPressed
          ]}
        >
          <Text style={styles.addBtnText}>+ ADD</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.searchHeader}>
        <Text style={styles.pageTitle}>Search Dishes</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search burgers, pizzas, ramen..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable 
              onPress={() => setSearchQuery('')}
              style={styles.clearBtn}
            >
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </Pressable>
          )}
        </View>
      </View>

      {searchQuery.trim().length === 0 ? (
        <View style={styles.popularContainer}>
          <Text style={styles.popularTitle}>Popular Searches 🔥</Text>
          <View style={styles.tagsContainer}>
            {POPULAR_TAGS.map(tag => (
              <Pressable 
                key={tag}
                onPress={() => handleSelectTag(tag)}
                style={({ pressed }) => [
                  styles.tagPill,
                  pressed && styles.tagPressed
                ]}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.illustrationContainer}>
            <View style={styles.decorCircle}>
              <Ionicons name="fast-food-outline" size={54} color="#CBD5E1" />
            </View>
            <Text style={styles.illustrationText}>Find your favorite cravings instantly!</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderResultItem}
          keyExtractor={item => `${item.restaurantId}_${item.dish.id}`}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.noResultsContainer}>
              <View style={styles.noResultsCircle}>
                <Ionicons name="search-outline" size={50} color="#CBD5E1" />
              </View>
              <Text style={styles.noResultsTitle}>No Cravings Found</Text>
              <Text style={styles.noResultsSubtitle}>
                We couldn't find any dishes matching "{searchQuery}". Try exploring other gourmet keywords!
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  searchHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
  popularContainer: {
    flex: 1,
    padding: 20,
  },
  popularTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 14,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  tagPressed: {
    backgroundColor: '#F1F5F9',
    transform: [{ scale: 0.95 }],
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  decorCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  illustrationText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
    textAlign: 'center',
  },
  resultsList: {
    padding: 20,
    paddingBottom: 40,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 12,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  dishDetails: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },
  restaurantNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  restaurantNameText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0253ad',
    marginLeft: 4,
  },
  dishName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  dishDescription: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
    lineHeight: 14,
  },
  dishPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
    marginTop: 4,
  },
  addBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
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
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  noResultsCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  noResultsSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
})