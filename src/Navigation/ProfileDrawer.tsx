import React from 'react';
import { View, StyleSheet } from 'react-native';
import Profile from '../screens/tabs/Profile';
import ProfileDrawerOverlay from '../components/ProfileDrawerOverlay';

export default function ProfileDrawer() {
  return (
    <View style={styles.container}>
      <Profile />
      <ProfileDrawerOverlay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
