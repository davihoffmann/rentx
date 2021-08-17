import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import AppTabRoutes from './app.tab.routes';
import AuthRoutes from './auth.routes';

export default function Routes(): ReactElement {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? <AppTabRoutes /> :  <AuthRoutes />}
    </NavigationContainer>
  );
}
