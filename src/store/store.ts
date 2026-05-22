import { create } from "zustand"
import { Restaurant, RESTAURANTS, Dish } from "../constants/restaurants"
import { setItem } from "../utilities/asyncStorage"

export interface CartItem {
  dish: Dish;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
}

export interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  items: {
    dishId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  date: string;
  status: 'upcoming' | 'past';
}

interface IStore {
    isAuthenticated: boolean,
    theme: string,
    onSplashScreen: boolean,
    onOnBoardingScreen: boolean,
    username: string,
    password: string,
    email: string,
    avatarUrl: string,
    restaurants: Restaurant[],
    cart: CartItem[],
    orders: Order[],
    setTheme: () => void,
    setIsAuthenticated: (val: boolean) => void,
    setOnSplashScreen: (val: boolean) => void,
    setIsOnBoardingScreen: (val: boolean) => void,
    setUsername: (val: string) => void,
    setPassword: (val: string) => void,
    setEmail: (val: string) => void,
    setAvatarUrl: (val: string) => void,
    setProfileInfo: (username: string, email: string) => void,
    setRestaurants: (restaurants: Restaurant[]) => void,
    loadRestaurants: () => void,
    isProfileDrawerOpen: boolean,
    setProfileDrawerOpen: (val: boolean) => void,
    addToCart: (dish: Dish, restaurantId: string, restaurantName: string) => void,
    removeFromCart: (dishId: string) => void,
    updateCartQuantity: (dishId: string, quantity: number) => void,
    clearCart: () => void,
    getCartCount: () => number,
    getCartTotal: () => number,
    placeOrder: () => void,
    logout: () => void
}

export const useStore = create<IStore>((set: any, get: any) => ({
    isAuthenticated: false,
    theme: "light",
    onSplashScreen: true,
    onOnBoardingScreen: true,
    username: "Gaurav",
    password: "",
    email: "gaurav@dev.com",
    avatarUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=150&h=150&fit=crop",
    restaurants: RESTAURANTS,
    cart: [],
    orders: [
      {
        id: "ord_1",
        restaurantName: "Punjab Da Dhaba",
        restaurantImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=400",
        items: [
          { dishId: "101", name: "Butter Chicken", price: 299, quantity: 2 },
          { dishId: "103", name: "Garlic Butter Naan", price: 69, quantity: 3 }
        ],
        totalPrice: 805,
        date: "May 20, 2026",
        status: "past"
      }
    ],

    setUsername: (val: string) => set(() => ({ username: val })),
    setPassword: (val: string) => set(() => ({ password: val })),
    setEmail: (val: string) => set(() => ({ email: val })),
    setAvatarUrl: (val: string) => set(() => ({ avatarUrl: val })),
    setProfileInfo: (username: string, email: string) => set(() => ({ username, email })),

    setOnSplashScreen: (val: boolean) =>
        set(() => ({ onSplashScreen: val })),

    isProfileDrawerOpen: false,
    setProfileDrawerOpen: (val: boolean) => set(() => ({ isProfileDrawerOpen: val })),

    setTheme: () =>
        set((state: any) => ({ theme: state.theme === "light" ? "dark" : "light" })),

    setIsAuthenticated: (val: boolean) => {
        set(() => ({ isAuthenticated: val }));
        setItem('isAuthenticated', val);
    },

    setIsOnBoardingScreen: (val: boolean) =>
        set({ onOnBoardingScreen: val }),

    setRestaurants: (restaurants: Restaurant[]) =>
        set({ restaurants }),

    loadRestaurants: () =>
        set({ restaurants: RESTAURANTS }),
    logout: () => {
        set(() => ({ 
            isAuthenticated: false, 
            onOnBoardingScreen: true,
            cart: []
        }));
        setItem('isAuthenticated', false);
    },

    addToCart: (dish: Dish, restaurantId: string, restaurantName: string) => {
      set((state: any) => {
        const existingItemIndex = state.cart.findIndex((item: CartItem) => item.dish.id === dish.id);
        const differentRestaurant = state.cart.length > 0 && state.cart[0].restaurantId !== restaurantId;
        const currentCart = differentRestaurant ? [] : [...state.cart];

        if (existingItemIndex > -1 && !differentRestaurant) {
          const updatedCart = [...currentCart];
          updatedCart[existingItemIndex].quantity += 1;
          return { cart: updatedCart };
        } else {
          return {
            cart: [...currentCart, { dish, restaurantId, restaurantName, quantity: 1 }]
          };
        }
      });
    },

    removeFromCart: (dishId: string) => {
      set((state: any) => ({
        cart: state.cart.filter((item: CartItem) => item.dish.id !== dishId)
      }));
    },

    updateCartQuantity: (dishId: string, quantity: number) => {
      set((state: any) => {
        if (quantity <= 0) {
          return { cart: state.cart.filter((item: CartItem) => item.dish.id !== dishId) };
        }
        return {
          cart: state.cart.map((item: CartItem) => 
            item.dish.id === dishId ? { ...item, quantity } : item
          )
        };
      });
    },

    clearCart: () => set({ cart: [] }),
    
    getCartCount: () => {
      const state = get();
      return state.cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
    },

    getCartTotal: () => {
      const state = get();
      return state.cart.reduce((total: number, item: CartItem) => total + (item.dish.price * item.quantity), 0);
    },
    placeOrder: () => {
      set((state: any) => {
        if (state.cart.length === 0) return {};

        const activeRestaurantId = state.cart[0].restaurantId;
        const activeRestaurant = state.restaurants.find((r: Restaurant) => r.id === activeRestaurantId);
        const deliveryFeeVal = activeRestaurant ? activeRestaurant.deliveryFee : 'Free';
        const deliveryFeeNum = deliveryFeeVal === 'Free' ? 0 : parseFloat(deliveryFeeVal.replace('₹', ''));
        const subtotal = state.cart.reduce((total: number, item: CartItem) => total + (item.dish.price * item.quantity), 0);
        const taxAndPlatform = 30;
        const grandTotal = subtotal + deliveryFeeNum + taxAndPlatform;

        const newOrder: Order = {
          id: `ord_${Date.now()}`,
          restaurantName: state.cart[0].restaurantName,
          restaurantImage: activeRestaurant?.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
          items: state.cart.map((item: CartItem) => ({
            dishId: item.dish.id,
            name: item.dish.name,
            price: item.dish.price,
            quantity: item.quantity
          })),
          totalPrice: parseFloat(grandTotal.toFixed(2)),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'upcoming'
        };

        return {
          orders: [newOrder, ...state.orders],
          cart: []
        };
      });
    }
}))
