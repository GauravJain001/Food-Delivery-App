import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useStore, Order } from '@/store/store'
import { useNavigation } from '@react-navigation/native'
import { RESTAURANTS } from '@/constants/restaurants'

const Orders = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const { orders, addToCart, restaurants } = useStore();

  const filteredOrders = orders.filter(order => order.status === activeTab);

  const handleReorder = (order: Order) => {
    const matchingRestaurant = restaurants.find(r => r.name === order.restaurantName) || RESTAURANTS[0];
    
    order.items.forEach(item => {
      const actualDish = matchingRestaurant.menu.find(d => d.id === item.dishId);
      if (actualDish) {
        addToCart(actualDish, matchingRestaurant.id, matchingRestaurant.name);
      }
    });
    
    navigation.navigate('Home', { screen: 'Cart' });
  };

  const renderOrderItem = ({ item }: { item: Order }) => {
    return (
      <View style={styles.orderCard}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: item.restaurantImage }} style={styles.restaurantImage} />
          <View style={styles.cardHeaderDetails}>
            <Text style={styles.restaurantName}>{item.restaurantName}</Text>
            <Text style={styles.orderDate}>{item.date} • {item.items.length} items</Text>
          </View>
          <Text style={styles.orderPrice}>₹{item.totalPrice}</Text>
        </View>

        <View style={styles.itemsSummary}>
          <Text style={styles.itemsText} numberOfLines={1}>
            {item.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
          </Text>
        </View>

        {activeTab === 'upcoming' ? (
          <View style={styles.trackerContainer}>
            <View style={styles.trackerStatusRow}>
              <View style={styles.statusGroup}>
                <View style={[styles.statusDot, styles.statusDotActive]} />
                <Text style={styles.statusLabelActive}>Preparing</Text>
              </View>
              <View style={styles.statusGroup}>
                <View style={[styles.statusDot, styles.statusDotActive]} />
                <Text style={styles.statusLabelActive}>On the Way</Text>
              </View>
              <View style={styles.statusGroup}>
                <View style={styles.statusDot} />
                <Text style={styles.statusLabelInactive}>Arrived</Text>
              </View>
            </View>
            
            <View style={styles.progressBarBg}>
              <View style={styles.progressBarFill} />
            </View>

            <View style={styles.etaRow}>
              <Ionicons name="time" size={16} color="#0253ad" />
              <Text style={styles.etaText}>Estimating arrival: 15-25 min</Text>
            </View>
          </View>
        ) : (
          <View style={styles.pastActionsRow}>
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-done-circle" size={14} color="#10B981" />
              <Text style={styles.completedText}>Completed</Text>
            </View>
            
            <View style={styles.actionBtnRow}>
              <Pressable 
                onPress={() => handleReorder(item)}
                style={({ pressed }) => [
                  styles.reorderBtn,
                  pressed && styles.btnPressed
                ]}
              >
                <Text style={styles.reorderText}>Reorder</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <View style={styles.tabBar}>
        <Pressable 
          onPress={() => setActiveTab('upcoming')}
          style={[styles.tabItem, activeTab === 'upcoming' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>Upcoming</Text>
        </Pressable>
        <Pressable 
          onPress={() => setActiveTab('past')}
          style={[styles.tabItem, activeTab === 'past' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>Past Orders</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons 
                name={activeTab === 'upcoming' ? 'fast-food-outline' : 'receipt-outline'} 
                size={54} 
                color="#CBD5E1" 
              />
            </View>
            <Text style={styles.emptyTitle}>
              {activeTab === 'upcoming' ? 'No Active Orders' : 'No Order History'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'upcoming' 
                ? "You don't have any active food deliveries right now. Tap browse below to explore menus!"
                : "You haven't checked out any orders in this account yet."}
            </Text>
            
            <Pressable 
              onPress={() => navigation.navigate('Home')}
              style={({ pressed }) => [
                styles.emptyActionBtn,
                pressed && styles.btnPressed
              ]}
            >
              <Text style={styles.emptyActionBtnText}>Discover Food</Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  )
}

export default Orders

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabActive: {
    backgroundColor: '#EBF5FF',
    borderColor: '#BFDBFE',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0253ad',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  cardHeaderDetails: {
    flex: 1,
    marginLeft: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  orderDate: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  itemsSummary: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  itemsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  trackerContainer: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  trackerStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginRight: 6,
  },
  statusDotActive: {
    backgroundColor: '#10B981',
  },
  statusLabelActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  statusLabelInactive: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    width: '66%',
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    borderRadius: 8,
    padding: 8,
  },
  etaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0253ad',
    marginLeft: 6,
  },
  pastActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  completedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
    marginLeft: 4,
  },
  actionBtnRow: {
    flexDirection: 'row',
  },
  reorderBtn: {
    backgroundColor: '#0253ad',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  reorderText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
    marginBottom: 24,
  },
  emptyActionBtn: {
    backgroundColor: '#0253ad',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
    shadowColor: '#0253ad',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyActionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
})