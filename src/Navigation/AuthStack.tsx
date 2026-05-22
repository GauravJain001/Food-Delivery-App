import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import OnBoarding from "../screens/Onboarding/OnBoarding";
import { useStore } from "../store/store";

const stack = createNativeStackNavigator();

function AuthStack(){
    const {onOnBoardingScreen} = useStore();
    return(
        <stack.Navigator>
            {
                onOnBoardingScreen ? 
                (
                    <stack.Screen name="Onboarding" 
                    component={OnBoarding} 
                    options={{headerShown:false}}>
                    </stack.Screen>)
                 : 
                 (
                <>
                 <stack.Screen name = "Login" 
                 component={Login} 
                 options={{headerShown:false}}>
                 </stack.Screen>
                 <stack.Screen name = "Signup" 
                 component={Signup} 
                 options={{headerShown:false}}>
                 </stack.Screen>
                 </>
                 )
            }
        </stack.Navigator>
    )
}

export default AuthStack;