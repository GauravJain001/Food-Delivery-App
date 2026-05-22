import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { useStore } from '@/store/store'
import RestaurantHero from '@/components/RestaurantHero'
import RestaurantInfo from '@/components/RestaurantInfo'
import DishRow from '@/components/DishRow'

const Restaurant = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { restaurants, addToCart } = useStore();

  const { id } = route.params || {};
  const restaurant = restaurants.find(r => r.id === String(id));

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar style="dark" />
        <Ionicons name="alert-circle-outline" size={60} color="#EA4335" />
        <Text style={styles.errorTitle}>Restaurant Not Found</Text>
        <Text style={styles.errorSubtitle}>The link you followed may be broken or the restaurant is unavailable.</Text>
        <Pressable 
          onPress={() => navigation.goBack()} 
          style={styles.errorBtn}
        >
          <Text style={styles.errorBtnText}>Go Back Home</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style="light" />
      
      <RestaurantHero 
        imageUri={restaurant.image} 
        onBackPress={() => navigation.goBack()} 
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <RestaurantInfo 
          name={restaurant.name}
          cuisine={restaurant.cuisine}
          rating={restaurant.rating}
          deliveryTime={restaurant.deliveryTime}
          deliveryFee={restaurant.deliveryFee}
          popular={restaurant.popular}
        />

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Available Dishes</Text>
          
          {restaurant.menu.map((dish) => (
            <DishRow 
              key={dish.id} 
              dish={dish} 
              onAddPress={() => addToCart(dish, restaurant.id, restaurant.name)} 
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Restaurant

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  menuContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  menuTitle: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  errorTitle: {
    color: '#1E293B',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 15,
  },
  errorSubtitle: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  errorBtn: {
    backgroundColor: '#0253ad',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 25,
  },
  errorBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
})
