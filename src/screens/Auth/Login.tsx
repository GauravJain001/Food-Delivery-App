import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthHeader from '@/components/AuthHeader'
import InputBox from '@/components/InputBox'
import { StatusBar } from 'expo-status-bar'
import Button_ from '@/components/Button_'
import AuthFooter from '@/components/AuthFooter'
import { useStore } from '@/store/store'
import { useNavigation } from '@react-navigation/native'

const AuthHeaderProps = {
    heading:"Welcome back 👋",
    subHeading:"Sign in to your account"
}

const InputBoxProps = {
    heading:"Email address",
    icon:"mail",
    placeholder:"Enter your email",
    hidden:false,
}
const InputBoxPropsPassword = {
    heading:"Password",
    icon:"lock",
    placeholder:"Enter your password",
    hidden:true
}
const ButtonProps = {
    heading:"Login",
}
const Login = () => {
    const {isAuthenticated,setIsAuthenticated} = useStore();
    const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={[styles.container]}>
        <StatusBar style='dark'></StatusBar>
        <AuthHeader
        {...AuthHeaderProps}
        />
        <InputBox
        {...InputBoxProps}
       
        />
        <InputBox
        {...InputBoxPropsPassword}
       
        />
        <Button_
        {...ButtonProps}
        onPress={() => setIsAuthenticated(true)}
        />
        <AuthFooter
        text="Don't have an account?"
        actionText="Sign Up"
        onActionPress={() => navigation.replace('Signup')}
        onGooglePress={() => console.log('Google login clicked')}
        onApplePress={() => console.log('Apple login clicked')}
        />
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        gap:25,
        backgroundColor: '#FFFFFF', 
    }
})