import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '@/store/store'
import HomeHeader from '@/components/HomeHeader'
import SearchBar from '@/components/SearchBar'
import PromoBanner from '@/components/PromoBanner'
import CategorySelector, { DEFAULT_CATEGORIES } from '@/components/CategorySelector'
import RestaurantCard from '@/components/RestaurantCard'
import ProfileDrawerOverlay from '@/components/ProfileDrawerOverlay'

const Home = () => {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const { restaurants, setProfileDrawerOpen } = useStore();

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === '1') return matchesSearch;
    
    const categoryName = DEFAULT_CATEGORIES.find(c => c.id === selectedCategory)?.name || '';
    const matchesCategory = restaurant.tags.some(tag => tag.toLowerCase().includes(categoryName.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style='dark' />
        
        <FlatList
          data={filteredRestaurants}
          renderItem={({ item }) => (
            <RestaurantCard 
              item={item} 
              onPress={() => navigation.navigate('Restaurant', { 
                id: item.id, 
                name: item.name, 
                price: item.menu[0]?.price || 199 
              })} 
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <View style={styles.headerComponent}>
              
              <HomeHeader onAvatarPress={() => setProfileDrawerOpen(true)} />

              
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />

             
              <PromoBanner />

            
              <CategorySelector
                selectedCategoryId={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

             
              <View style={styles.nearYouHeader}>
                <Text style={styles.sectionTitle}>Popular Restaurants</Text>
                <Text style={styles.seeAllLink}>See All</Text>
              </View>
            </View>
          }
          
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>No Restaurants Found</Text>
              <Text style={styles.emptySubtitle}>Try searching for something else or clear filters.</Text>
            </View>
          }
        />
      </SafeAreaView>
      <ProfileDrawerOverlay />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  listContainer: {
    paddingBottom: 24,
  },
  headerComponent: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: '700',
  },
  nearYouHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  seeAllLink: {
    color: '#0253ad',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyTitle: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
})