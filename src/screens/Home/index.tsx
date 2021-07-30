
import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Car from '../../components/Car';

import Logo from '../../assets/logo.svg';

import { 
   Container, 
   Header,
   HeaderContent,
   TotalCards
} from './styles';
 
export default function Home(): ReactElement {
  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://img2.gratispng.com/20180618/hwg/kisspng-2015-audi-a6-2016-audi-a6-2018-audi-a6-audi-s6-2016-audi-a6-30t-premium-plus-5b27746431f124.5210989915293123562046.jpg'
  }

  const carData2 = {
    brand: 'Porche',
    name: 'Panamera',
    rent: {
      period: 'Ao dia',
      price: 340,
    },
    thumbnail: 'https://img2.gratispng.com/20180618/bzc/kisspng-mid-size-car-porsche-panamera-4-e-hybrid-sport-tur-2018-porsche-panamera-5b2814804a5f90.7485803615293533443046.jpg'
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCards>Total de 12 carros</TotalCards>
        </HeaderContent>
      </Header>
      <Car data={carData} />
      <Car data={carData2} />
    </Container>
  );
}
 