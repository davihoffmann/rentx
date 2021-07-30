import React from 'react';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages
} from './styles';

export default function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider 
          imageUrl={['https://img2.gratispng.com/20180618/hwg/kisspng-2015-audi-a6-2016-audi-a6-2018-audi-a6-audi-s6-2016-audi-a6-30t-premium-plus-5b27746431f124.5210989915293123562046.jpg']} 
        />
      </CarImages>
    </Container>
  )
}