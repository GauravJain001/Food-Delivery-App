import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/tabs/Home";
import Restaurant from "../screens/Restaurant";
import Cart from "../screens/Cart";

const stack = createNativeStackNavigator();

function MainStack(){
    return(
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name="HomeScreen" component={Home}></stack.Screen>
            <stack.Screen name="Restaurant" component={Restaurant}></stack.Screen>
            <stack.Screen name="Cart" component={Cart}></stack.Screen>
        </stack.Navigator>
    )
}

export default MainStack;