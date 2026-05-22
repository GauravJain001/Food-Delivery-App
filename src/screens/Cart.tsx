import { Image, Pressable, ScrollView, StyleSheet, Text, View, TextInput, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useStore, CartItem } from '@/store/store'
import { StatusBar } from 'expo-status-bar'

const Cart = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { 
    cart, 
    restaurants, 
    updateCartQuantity, 
    getCartTotal, 
    placeOrder 
  } = useStore();

  const [notes, setNotes] = useState('');
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isCheckoutSuccess) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      ]).start();

      const timer = setTimeout(() => {
        setIsCheckoutSuccess(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        navigation.navigate('Orders');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isCheckoutSuccess]);

  if (isCheckoutSuccess) {
    return (
      <View style={styles.successContainer}>
        <StatusBar style="dark" />
        <Animated.View style={[styles.successCard, { transform: [{ scale: scaleAnim }], opacity: fadeAnim }]}>
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark-circle" size={80} color="#10B981" />
          </View>
          <Text style={styles.successTitle}>Order Placed!</Text>
          <Text style={styles.successSubtitle}>
            Your delicious meal is being prepared. You can track its status in the Orders tab.
          </Text>
          <View style={styles.successLoaderBar}>
            <Animated.View style={styles.successLoaderProgress} />
          </View>
        </Animated.View>
      </View>
    );
  }

  const isCartEmpty = cart.length === 0;

  const activeRestaurant = !isCartEmpty 
    ? restaurants.find(r => r.id === cart[0].restaurantId)
    : null;

  const deliveryFeeVal = activeRestaurant ? activeRestaurant.deliveryFee : 'Free';
  const deliveryFeeNum = deliveryFeeVal === 'Free' ? 0 : parseFloat(deliveryFeeVal.replace('₹', ''));
  const itemTotal = getCartTotal();
  const taxAndPlatform = 30;
  const grandTotal = itemTotal + deliveryFeeNum + taxAndPlatform;

  const handleCheckout = () => {
    if (isCartEmpty) return;
    placeOrder();
    setIsCheckoutSuccess(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.headerBar}>
        <Pressable 
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backBtn, pressed && styles.btnPressed]}
        >
          <Ionicons name="chevron-back" size={24} color="#1E293B" />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout Cart</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {isCartEmpty ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="cart-outline" size={80} color="#CBD5E1" />
          </View>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet. Let's browse some gourmet spots!
          </Text>
          <Pressable 
            onPress={() => navigation.navigate('Home')}
            style={({ pressed }) => [styles.browseBtn, pressed && styles.btnPressed]}
          >
            <Text style={styles.browseBtnText}>Browse Restaurants</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.restaurantSection}>
              <Text style={styles.orderingFromLabel}>ORDERING FROM</Text>
              <Text style={styles.restaurantNameText}>{cart[0].restaurantName}</Text>
            </View>

            <View style={styles.itemsListContainer}>
              {cart.map((item: CartItem) => (
                <View key={item.dish.id} style={styles.cartItemRow}>
                  <Image source={{ uri: item.dish.image }} style={styles.dishThumbnail} />
                  <View style={styles.dishDetails}>
                    <Text style={styles.dishName}>{item.dish.name}</Text>
                    <Text style={styles.dishPrice}>₹{item.dish.price}</Text>
                  </View>
                  
                  <View style={styles.stepperContainer}>
                    <Pressable 
                      onPress={() => updateCartQuantity(item.dish.id, item.quantity - 1)}
                      style={({ pressed }) => [styles.stepperBtn, pressed && styles.stepperPressed]}
                    >
                      <Ionicons name="remove" size={16} color="#475569" />
                    </Pressable>
                    <Text style={styles.stepperValue}>{item.quantity}</Text>
                    <Pressable 
                      onPress={() => updateCartQuantity(item.dish.id, item.quantity + 1)}
                      style={({ pressed }) => [styles.stepperBtn, pressed && styles.stepperPressed]}
                    >
                      <Ionicons name="add" size={16} color="#475569" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.cardSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="location-outline" size={20} color="#0253ad" />
                <Text style={styles.sectionTitle}>Delivery Address</Text>
              </View>
              <View style={styles.addressCard}>
                <Text style={styles.addressTitle}>Home 🏠</Text>
                <Text style={styles.addressText}>123 random address</Text>
              </View>
            </View>

            <View style={styles.cardSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="create-outline" size={20} color="#0253ad" />
                <Text style={styles.sectionTitle}>Add Delivery Instructions</Text>
              </View>
              <TextInput 
                value={notes}
                onChangeText={setNotes}
                placeholder="e.g. Leave at front door, ring the bell..."
                placeholderTextColor="#94A3B8"
                style={styles.notesInput}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.cardSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="receipt-outline" size={20} color="#0253ad" />
                <Text style={styles.sectionTitle}>Bill Details</Text>
              </View>
              <View style={styles.billContainer}>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Item Total</Text>
                  <Text style={styles.billValue}>₹{itemTotal}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Delivery Fee</Text>
                  <Text style={[styles.billValue, deliveryFeeNum === 0 && styles.freeFeeText]}>
                    {deliveryFeeNum === 0 ? 'Free' : `₹${deliveryFeeNum}`}
                  </Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Taxes & Platform Fees</Text>
                  <Text style={styles.billValue}>₹{taxAndPlatform}</Text>
                </View>
                <View style={styles.billDivider} />
                <View style={styles.billRow}>
                  <Text style={styles.grandTotalLabel}>Grand Total</Text>
                  <Text style={styles.grandTotalValue}>₹{grandTotal}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={[styles.checkoutFooter, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <Pressable 
              onPress={handleCheckout}
              style={({ pressed }) => [styles.checkoutBtn, pressed && styles.checkoutBtnPressed]}
            >
              <Text style={styles.checkoutBtnText}>Place Order • ₹{grandTotal}</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={styles.checkoutArrow} />
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    padding: 4,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  headerPlaceholder: {
    width: 32,
  },
  btnPressed: {
    opacity: 0.7,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  restaurantSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  orderingFromLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.2,
  },
  restaurantNameText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 4,
  },
  itemsListContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dishThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  dishDetails: {
    flex: 1,
    marginLeft: 14,
  },
  dishName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  dishPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0253ad',
    marginTop: 4,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 4,
  },
  stepperBtn: {
    padding: 6,
    borderRadius: 8,
  },
  stepperPressed: {
    backgroundColor: '#E2E8F0',
  },
  stepperValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    paddingHorizontal: 8,
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginLeft: 8,
  },
  addressCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  addressTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  addressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 4,
    lineHeight: 16,
  },
  notesInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    fontSize: 13,
    color: '#1E293B',
    textAlignVertical: 'top',
  },
  billContainer: {
    marginTop: 4,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  billLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  billValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  freeFeeText: {
    color: '#10B981',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  grandTotalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0253ad',
  },
  checkoutFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  checkoutBtn: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
  checkoutBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  checkoutArrow: {
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  browseBtn: {
    backgroundColor: '#0253ad',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 24,
    shadowColor: '#0253ad',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  browseBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  successCard: {
    alignItems: 'center',
    width: '100%',
  },
  successIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E6F4EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  successLoaderBar: {
    height: 4,
    width: '60%',
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginTop: 30,
    overflow: 'hidden',
  },
  successLoaderProgress: {
    height: '100%',
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
})