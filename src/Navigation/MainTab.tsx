import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MainStack from './MainStack';
import Search from '../screens/tabs/Search';
import Orders from '../screens/tabs/Orders';
import ProfileDrawer from './ProfileDrawer';
import { Feather } from '@expo/vector-icons';
import { useStore } from '../store/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function MainTab(){
    const orders = useStore((state) => state.orders);
    const upcomingOrdersCount = orders.filter(order => order.status === 'upcoming').length;
    const insets = useSafeAreaInsets();

    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: any;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Search') {
                        iconName = 'search';
                    } else if (route.name === 'Orders') {
                        iconName = 'shopping-bag';
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
                    }

                    return <Feather name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: '#0253ad',
                tabBarInactiveTintColor: '#64748B',
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#F1F5F9',
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
                    paddingTop: 8,
                }
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={MainStack}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
                    if (routeName === 'Restaurant' || routeName === 'Cart') {
                        return { tabBarStyle: { display: 'none' } };
                    }
                    return {};
                }}
            ></Tab.Screen>
            <Tab.Screen name="Search" component={Search}></Tab.Screen>
            <Tab.Screen 
                name="Orders" 
                component={Orders}
                options={{
                    tabBarBadge: upcomingOrdersCount > 0 ? upcomingOrdersCount : undefined,
                    tabBarBadgeStyle: {
                        backgroundColor: '#0253ad',
                        color: '#FFFFFF',
                        fontSize: 10,
                        fontWeight: '800',
                    }
                }}
            ></Tab.Screen>
            <Tab.Screen name="Profile" component={ProfileDrawer}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default MainTab;
