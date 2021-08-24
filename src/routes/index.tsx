import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import AppTabRoutes from './app.tab.routes';
import AuthRoutes from './auth.routes';

import LoadAnimation from '../components/LoadAnimation';

export default function Routes(): ReactElement {
  const { user, loading } = useAuth();
  
  return (
    loading ? <LoadAnimation /> :
    (
      <NavigationContainer>
        {user.id ? <AppTabRoutes /> :  <AuthRoutes />}
      </NavigationContainer>
    )
  );
}
