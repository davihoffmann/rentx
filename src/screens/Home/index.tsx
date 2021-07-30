
import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Car from '../../components/Car';

import Logo from '../../assets/logo.svg';

import { 
   Container, 
   Header,
   HeaderContent,
   TotalCards,
   CarList
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
  };


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

      <CarList 
        data={[1, 2, 3]} 
        keyExtractor={item => String(item)}
        renderItem={({ item }) => (<Car data={carData} />)}
      />
      
    </Container>
  );
}
 