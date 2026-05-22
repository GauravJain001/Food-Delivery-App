import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Onboarding/SplashScreen';
import AuthStack from './AuthStack';
import MainTab from './MainTab';
import { useStore } from '../store/store';

const Stack = createNativeStackNavigator();

function RootStack() {
    const {onSplashScreen,isAuthenticated} = useStore();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {onSplashScreen ? (
                <Stack.Screen 
                    name="SplashScreen" 
                    component={SplashScreen}
                />
            ) : !isAuthenticated ? (
                <Stack.Screen 
                    name="AuthStack" 
                    component={AuthStack}
                />
            ) : (
                <Stack.Screen 
                    name="MainTab" 
                    component={MainTab}
                />
            )}
        </Stack.Navigator>
    );
}

export default RootStack;