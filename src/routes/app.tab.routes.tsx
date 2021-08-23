import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import AppStackRoutes from './app.stack.routes';

import Profile from '../screens/Profile';
import MyCars from '../screens/MyCars';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';



const { Navigator, Screen } = createBottomTabNavigator();

export default function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator screenOptions={{ 
      headerShown: false, 
      tabBarActiveTintColor: theme.colors.main,
      tabBarInactiveTintColor: theme.colors.text_detail,
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingVertical: Platform.OS === 'ios' ? 20  : 0,
        height: 78,
        backgroundColor: theme.colors.background_primary
      }
    }}>
      <Screen 
        name="Home" 
        component={AppStackRoutes}
        options={{
          tabBarIcon: (({ color }) => (
            <HomeSvg fill={color} width={24} height={24} />
          ))
        }}
      />
      <Screen 
        name="MyCars" 
        component={MyCars}
        options={{
          tabBarIcon: (({ color }) => (
            <CarSvg fill={color} width={24} height={24} />
          ))
        }}
      />
      <Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: (({ color }) => (
            <PeopleSvg fill={color} width={24} height={24} />
          ))
        }}
      />
    </Navigator>
  );
}