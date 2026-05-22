import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface AuthHeaderProps {
  heading: string;
  subHeading: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({heading, subHeading}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.heading]}>{heading}</Text>
      <Text style={[styles.subHeading]}>{subHeading}</Text>
    </View>
  )
}

export default AuthHeader

const styles = StyleSheet.create({
    container:{
        gap:10,
    },
    heading:{
        color:"#1E293B",
        fontSize:30,
        fontWeight:"bold",
    },
    subHeading:{
        color:"#494c50ff",
        fontSize:17,
        fontWeight:"500",
    }

})