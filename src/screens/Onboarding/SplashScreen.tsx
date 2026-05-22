import { ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { getItem, setItem } from '../../utilities/asyncStorage';
import { useStore } from '../../store/store';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const { setIsAuthenticated, setOnSplashScreen } = useStore();

  useEffect(() => {
    const checkPersistedAuth = async () => {
      try {
        const persistedAuth = await getItem('isAuthenticated');
        if (persistedAuth === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.log("Error loading persisted auth:", e);
      } finally {
        setTimeout(() => {
          setOnSplashScreen(false);
        }, 1200);
      }
    };

    checkPersistedAuth();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <ImageBackground
        source={require("../../../assets/splash-screen-bg-3.png")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  "container": {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  "backgroundImage": {

  }
})