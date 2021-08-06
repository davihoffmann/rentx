import React, { ReactElement } from 'react';
import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/loadingCar.json';

import { Container } from './styles';

export default function LoadAnimation(): ReactElement {
  return (
    <Container>
      <LottieView 
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        loop
        autoPlay
      />
    </Container>
  );
}
