import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import MyCars from '../screens/MyCars';
import CarDetails from '../screens/CarDetails';
import Scheduling from '../screens/Scheduling';
import SchedulingDetails from '../screens/SchedulingDetails';
import Confirmation from '../screens/Confirmation';

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeStack">
      <Screen name="HomeStack" component={Home}  />
      {/* options={{ gestureEnabled: false }} */}
      <Screen name="MyCars" component={MyCars} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}