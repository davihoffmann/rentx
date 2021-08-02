import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import CarDetails from '../screens/CarDetails';
import Scheduling from '../screens/Scheduling';
import SchedulingDetails from '../screens/SchedulingDetails';
import SchedulingComplete from '../screens/SchedulingComplete';

const { Navigator, Screen } = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" key="Home"component={Home} />
      <Screen name="CarDetails" key="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" key="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" key="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" key="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  );
}