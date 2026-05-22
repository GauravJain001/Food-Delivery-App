import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import AuthHeader from '@/components/AuthHeader'
import InputBox from '@/components/InputBox'
import Button_ from '@/components/Button_'
import AuthFooter from '@/components/AuthFooter'
import { useStore } from '@/store/store'
import { useNavigation } from '@react-navigation/native'

const AuthHeaderProps = {
    heading: "Create Account 🚀",
    subHeading: "Sign up in 1 minute to get started"
}

const NameInputProps = {
    heading: "Full Name",
    icon: "user",
    placeholder: "Enter your name",
    hidden: false,
}

const EmailInputProps = {
    heading: "Email address",
    icon: "mail",
    placeholder: "Enter your email",
    hidden: false,
}

const PasswordInputProps = {
    heading: "Password",
    icon: "lock",
    placeholder: "Enter your password",
    hidden: true
}

const ButtonProps = {
    heading: "Sign Up",
}

const Signup = () => {
    const { setIsAuthenticated } = useStore();
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar style='dark' />
            <AuthHeader
                {...AuthHeaderProps}
            />
            <InputBox
                {...NameInputProps}
            />
            <InputBox
                {...EmailInputProps}
            />
            <InputBox
                {...PasswordInputProps}
            />
            <Button_
                {...ButtonProps}
                onPress={() => setIsAuthenticated(true)}
            />
            <AuthFooter
                text="Already have an account?"
                actionText="Sign In"
                onActionPress={() => navigation.replace('Login')}
                onGooglePress={() => console.log('Google sign up clicked')}
                onApplePress={() => console.log('Apple sign up clicked')}
            />
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 25,
        backgroundColor: '#FFFFFF',
    }
})