import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/Navigation/RootStack';

const linking = {
  prefixes: ['foodapp://', 'https://foodapp.com'],
  config: {
    screens: {
      MainTab: {
        path: 'app',
        screens: {
          Home: {
            path: 'home',
            screens: {
              Home: '',
              Restaurant: 'restaurant/:id',
            }
          },
          Search: 'search',
          Orders: 'orders',
          Profile: 'profile',
        }
      },
      AuthStack: {
        path: 'auth',
        screens: {
          Login: 'login',
          Signup: 'signup',
        }
      }
    }
  }
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <RootStack />
    </NavigationContainer>
  );
}