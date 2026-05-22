import { StyleSheet, Text, View, Image, useWindowDimensions, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { useStore } from '../../store/store';

const OnBoarding = () => {
  const dimensions = useWindowDimensions();
  const imageDynamic = {
    height: dimensions.height * 0.7,
    width: dimensions.width,
  };

  const {setIsOnBoardingScreen} = useStore();
 

  const innerContainerDynamic = [
    { height: dimensions.height * 0.7 },
    styles.innerContainer
  ];

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar style='dark'/>
      <View style={innerContainerDynamic}>
      <Image
      source={require("../../../assets/onBoarding.png")}
      resizeMode="contain"
      style={imageDynamic}
      />
      </View>
      <Pressable onPress={()=>setIsOnBoardingScreen(false)}>
      <View style={[styles.button]}>
        <Text style={[styles.buttonText]}>Get Started</Text>
      </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf9f3", 
  },
  innerContainer:{
    width:"100%",
    marginBottom:20,
  },
  button:{
    alignSelf:"center",
    height:60,
    width:250,
    backgroundColor:"#0253ad",
    borderRadius:30,
    justifyContent:"center",
    alignItems:"center",
  },
  buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold",
  }
  
})