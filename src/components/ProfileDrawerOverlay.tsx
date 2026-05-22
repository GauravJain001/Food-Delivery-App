import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Pressable, 
  Alert, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '@/store/store';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_WIDTH = 280;

function CustomDrawerContent() {
  const { username, email, avatarUrl, logout, theme, setProfileDrawerOpen } = useStore();
  const navigation = useNavigation<any>();
  const isDark = theme === 'dark';

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out of your food delivery account?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => {
            setProfileDrawerOpen(false);
            logout();
          }
        }
      ]
    );
  };

  const closeDrawer = () => {
    setProfileDrawerOpen(false);
  };

  return (
    <View style={[styles.drawerContainer, isDark && styles.darkDrawerContainer]}>
      <View style={[styles.profileHeader, isDark && styles.darkProfileHeader]}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={[styles.name, isDark && styles.darkText]} numberOfLines={1}>{username}</Text>
        <Text style={styles.email} numberOfLines={1}>{email}</Text>
      </View>
      <View style={styles.itemsSection}>
        <Pressable
          onPress={() => {
            closeDrawer();
            navigation.navigate('Orders');
          }}
          style={({ pressed }) => [
            styles.drawerItem,
            isDark && styles.darkDrawerItem,
            pressed && styles.drawerItemPressed
          ]}
        >
          <Ionicons name="receipt-outline" size={22} color="#0253ad" />
          <Text style={[styles.itemLabel, isDark && styles.darkText]}>My Orders</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            closeDrawer();
            Alert.alert('App Settings', 'Configure notification, payment, and security preferences. Coming soon!');
          }}
          style={({ pressed }) => [
            styles.drawerItem,
            isDark && styles.darkDrawerItem,
            pressed && styles.drawerItemPressed
          ]}
        >
          <Ionicons name="settings-outline" size={22} color="#0253ad" />
          <Text style={[styles.itemLabel, isDark && styles.darkText]}>Settings</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            closeDrawer();
            Alert.alert('Support Center', 'Contact our 24/7 dedicated customer service representatives at support@foodapp.com.');
          }}
          style={({ pressed }) => [
            styles.drawerItem,
            isDark && styles.darkDrawerItem,
            pressed && styles.drawerItemPressed
          ]}
        >
          <Ionicons name="help-circle-outline" size={22} color="#0253ad" />
          <Text style={[styles.itemLabel, isDark && styles.darkText]}>Help & Support</Text>
        </Pressable>
      </View>
      <View style={[styles.footerSection, isDark && styles.darkFooterSection]}>
        <Pressable 
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutBtn,
            isDark && styles.darkLogoutBtn,
            pressed && styles.logoutBtnPressed
          ]}
        >
          <Ionicons name="log-out-outline" size={20} color="#EA4335" />
          <Text style={styles.logoutBtnText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ProfileDrawerOverlay() {
  const { isProfileDrawerOpen, setProfileDrawerOpen } = useStore();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isProfileDrawerOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isProfileDrawerOpen]);

  return (
    <View 
      pointerEvents={isProfileDrawerOpen ? 'auto' : 'none'} 
      style={StyleSheet.absoluteFillObject}
    >
      <Animated.View 
        style={[
          styles.overlay, 
          { opacity: fadeAnim }
        ]}
      >
        <TouchableWithoutFeedback onPress={() => setProfileDrawerOpen(false)}>
          <View style={styles.overlayPressTarget} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View 
        style={[
          styles.drawerSheet,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <CustomDrawerContent />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    zIndex: 9998,
  },
  overlayPressTarget: {
    flex: 1,
  },
  drawerSheet: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkDrawerContainer: {
    backgroundColor: '#1E293B',
  },
  profileHeader: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkProfileHeader: {
    backgroundColor: '#0F172A',
    borderBottomColor: '#334155',
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  darkText: {
    color: '#F8FAFC',
  },
  email: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
  itemsSection: {
    paddingTop: 24,
    paddingHorizontal: 12,
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: 'transparent',
  },
  darkDrawerItem: {
    backgroundColor: 'transparent',
  },
  drawerItemPressed: {
    backgroundColor: '#EFF6FF',
    opacity: 0.9,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginLeft: 14,
  },
  footerSection: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#F8FAFC',
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  darkFooterSection: {
    backgroundColor: '#0F172A',
    borderTopColor: '#334155',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: 12,
  },
  darkLogoutBtn: {
    backgroundColor: '#7F1D1D33',
    borderColor: '#7F1D1D',
  },
  logoutBtnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  logoutBtnText: {
    color: '#EA4335',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 8,
  },
});
