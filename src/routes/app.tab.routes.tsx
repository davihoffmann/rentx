import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppStackRoutes from './app.stack.routes';

import Profile from '../screens/Profile';
import MyCars from '../screens/MyCars';

const { Navigator, Screen } = createBottomTabNavigator();

export default function AppTabRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={AppStackRoutes} />
      <Screen name="Profile" component={Profile} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}