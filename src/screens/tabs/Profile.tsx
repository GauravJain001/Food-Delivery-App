import { StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  Pressable, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useStore } from '@/store/store'



const Profile = () => {
  const { 
    username, 
    email, 
    avatarUrl, 
    orders, 
    setProfileInfo,
    theme,
    setTheme,
    setProfileDrawerOpen,
    logout
  } = useStore();

  const [tempUsername, setTempUsername] = useState(username);
  const [tempEmail, setTempEmail] = useState(email);
  const [isFocusedUser, setIsFocusedUser] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    setTempUsername(username);
    setTempEmail(email);
  }, [username, email]);

  const hasUnsavedChanges = tempUsername !== username || tempEmail !== email;

  const handleSaveChanges = () => {
    if (!tempUsername.trim()) {
      Alert.alert('Error', 'Username cannot be empty.');
      return;
    }
    if (!tempEmail.trim() || !tempEmail.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setProfileInfo(tempUsername.trim(), tempEmail.trim());
    
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

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
            logout();
          }
        }
      ]
    );
  };



  const upcomingCount = orders.filter(o => o.status === 'upcoming').length;
  const pastCount = orders.filter(o => o.status === 'past').length;
  const totalSpent = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && styles.darkContainer]} edges={['top']}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
      >
        <View style={[styles.header, theme === 'dark' && styles.darkHeader]}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.headerTitle, theme === 'dark' && styles.darkText]}>Profile Settings</Text>
              <Text style={styles.headerSubtitle}>Customize your app experience</Text>
            </View>
            <Pressable 
              onPress={() => setProfileDrawerOpen(true)}
              style={({ pressed }) => [
                styles.menuBtn,
                theme === 'dark' && styles.darkMenuBtn,
                pressed && styles.btnPressed
              ]}
            >
              <Ionicons name="menu-outline" size={26} color={theme === 'dark' ? '#F8FAFC' : '#1E293B'} />
            </Pressable>
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <View style={[styles.avatarBorder, theme === 'dark' && styles.darkAvatarBorder]}>
                <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
              </View>
              
            </View>
            <Text style={[styles.avatarHeaderName, theme === 'dark' && styles.darkText]}>{username}</Text>
            <Text style={styles.avatarHeaderEmail}>{email}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.statCard, theme === 'dark' && styles.darkStatCard]}>
              <Text style={styles.statVal}>{upcomingCount}</Text>
              <Text style={styles.statLabel}>Active Orders</Text>
            </View>
            <View style={[styles.statCard, theme === 'dark' && styles.darkStatCard]}>
              <Text style={styles.statVal}>{pastCount}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={[styles.statCard, theme === 'dark' && styles.darkStatCard]}>
              <Text style={[styles.statVal, styles.statValPrimary]}>₹{totalSpent}</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
          </View>

          <View style={[styles.sectionCard, theme === 'dark' && styles.darkSectionCard]}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}>Personal Information</Text>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>FULL NAME</Text>
              <View style={[
                styles.inputContainer,
                isFocusedUser && styles.inputContainerFocused,
                theme === 'dark' && styles.darkInputContainer
              ]}>
                <Ionicons name="person-outline" size={20} color={isFocusedUser ? "#0253ad" : "#94A3B8"} style={styles.inputIcon} />
                <TextInput
                  value={tempUsername}
                  onChangeText={setTempUsername}
                  onFocus={() => setIsFocusedUser(true)}
                  onBlur={() => setIsFocusedUser(false)}
                  style={[styles.textInput, theme === 'dark' && styles.darkText]}
                  placeholder="Enter full name"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
              <View style={[
                styles.inputContainer,
                isFocusedEmail && styles.inputContainerFocused,
                theme === 'dark' && styles.darkInputContainer
              ]}>
                <Ionicons name="mail-outline" size={20} color={isFocusedEmail ? "#0253ad" : "#94A3B8"} style={styles.inputIcon} />
                <TextInput
                  value={tempEmail}
                  onChangeText={setTempEmail}
                  onFocus={() => setIsFocusedEmail(true)}
                  onBlur={() => setIsFocusedEmail(false)}
                  style={[styles.textInput, theme === 'dark' && styles.darkText]}
                  placeholder="Enter email address"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>

          <View style={[styles.sectionCard, theme === 'dark' && styles.darkSectionCard]}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}>Preferences & Settings</Text>

            <Pressable 
              onPress={() => Alert.alert('Saved Addresses', 'Add and edit your home/office locations for instant checkout. Feature coming soon!')}
              style={({ pressed }) => [
                styles.settingsRow,
                pressed && styles.settingsRowPressed
              ]}
            >
              <View style={styles.settingsRowLeft}>
                <View style={[styles.settingsIconCircle, { backgroundColor: '#EFF6FF' }]}>
                  <Ionicons name="location-outline" size={20} color="#2563EB" />
                </View>
                <View style={styles.settingsTextDetails}>
                  <Text style={[styles.settingsTitleText, theme === 'dark' && styles.darkText]}>Saved Addresses</Text>
                  <Text style={styles.settingsSubtitleText}>Manage delivery addresses</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </Pressable>

            <Pressable 
              onPress={() => Alert.alert('Payment Methods', 'Manage your cards, digital wallets, or direct bank transfer preferences safely. Feature coming soon!')}
              style={({ pressed }) => [
                styles.settingsRow,
                pressed && styles.settingsRowPressed
              ]}
            >
              <View style={styles.settingsRowLeft}>
                <View style={[styles.settingsIconCircle, { backgroundColor: '#FAF5FF' }]}>
                  <Ionicons name="card-outline" size={20} color="#9333EA" />
                </View>
                <View style={styles.settingsTextDetails}>
                  <Text style={[styles.settingsTitleText, theme === 'dark' && styles.darkText]}>Payment Methods</Text>
                  <Text style={styles.settingsSubtitleText}>Manage credit cards & wallets</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </Pressable>

            <Pressable 
              onPress={() => Alert.alert('Support Center', 'Our 24/7 dedicated customer service representatives are ready to assist you. Dial 1-800-FOOD-APP')}
              style={({ pressed }) => [
                styles.settingsRow,
                pressed && styles.settingsRowPressed
              ]}
            >
              <View style={styles.settingsRowLeft}>
                <View style={[styles.settingsIconCircle, { backgroundColor: '#FFF7ED' }]}>
                  <Ionicons name="help-circle-outline" size={20} color="#EA580C" />
                </View>
                <View style={styles.settingsTextDetails}>
                  <Text style={[styles.settingsTitleText, theme === 'dark' && styles.darkText]}>Help & Support</Text>
                  <Text style={styles.settingsSubtitleText}>24/7 client care assistance</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </Pressable>

            <Pressable 
              onPress={handleLogout}
              style={({ pressed }) => [
                styles.settingsRow,
                styles.settingsRowLast,
                pressed && styles.settingsRowPressed
              ]}
            >
              <View style={styles.settingsRowLeft}>
                <View style={[styles.settingsIconCircle, { backgroundColor: '#FFF5F5' }]}>
                  <Ionicons name="log-out-outline" size={20} color="#EA4335" />
                </View>
                <View style={styles.settingsTextDetails}>
                  <Text style={[styles.settingsTitleText, { color: '#EA4335' }]}>Logout</Text>
                  <Text style={styles.settingsSubtitleText}>Sign out of your account</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#EA4335" />
            </Pressable>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {showSuccessToast && (
          <View style={styles.toastContainer}>
            <View style={styles.toastCard}>
              <Ionicons name="checkmark-circle" size={22} color="#10B981" />
              <Text style={styles.toastText}>Changes saved successfully!</Text>
            </View>
          </View>
        )}

        {hasUnsavedChanges && (
          <View style={styles.saveBannerContainer}>
            <View style={[styles.saveBanner, theme === 'dark' && styles.darkSaveBanner]}>
              <View style={styles.saveBannerLeft}>
                <Ionicons name="warning-outline" size={20} color="#0253ad" />
                <Text style={[styles.saveBannerText, theme === 'dark' && styles.darkText]}>Unsaved changes detected</Text>
              </View>
              <Pressable 
                onPress={handleSaveChanges}
                style={({ pressed }) => [
                  styles.saveBannerBtn,
                  pressed && styles.btnPressed
                ]}
              >
                <Ionicons name="checkmark" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.saveBannerBtnText}>Save</Text>
              </Pressable>
            </View>
          </View>
        )}


      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  darkContainer: {
    backgroundColor: '#0F172A',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  darkHeader: {
    backgroundColor: '#1E293B',
    borderBottomColor: '#334155',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkMenuBtn: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
  },
  darkText: {
    color: '#F8FAFC',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarBorder: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  darkAvatarBorder: {
    borderColor: '#1E293B',
    backgroundColor: '#1E293B',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },

  avatarHeaderName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  avatarHeaderEmail: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 8,
    elevation: 1,
  },
  darkStatCard: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  statValPrimary: {
    color: '#0253ad',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  darkSectionCard: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 16,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#F8FAFC',
  },
  darkInputContainer: {
    borderColor: '#334155',
    backgroundColor: '#0F172A',
  },
  inputContainerFocused: {
    borderColor: '#0253ad',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0253ad',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingsRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 4,
  },
  settingsRowPressed: {
    opacity: 0.7,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingsTextDetails: {
    flexDirection: 'column',
  },
  settingsTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  settingsSubtitleText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 1,
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 999,
    alignItems: 'center',
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  toastText: {
    color: '#065F46',
    fontWeight: '700',
    fontSize: 13,
    marginLeft: 8,
  },
  saveBannerContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    zIndex: 900,
  },
  saveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  darkSaveBanner: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  saveBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveBannerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginLeft: 8,
  },
  saveBannerBtn: {
    backgroundColor: '#0253ad',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveBannerBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
})