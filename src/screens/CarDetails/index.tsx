import React from 'react';

import BackButton from '../../components/BackButton';

import {
  Container,
  Header
} from './styles';

export default function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
    </Container>
  )
}