import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import BackButton from '../../components/BackButton';
import Button from '../../components/Button';

import ArrowSvg from '../../assets/arrow.svg'

import { 
  Container, 
  Header, 
  Title, 
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValueArea,
  DateValue,
  Content,
  Footer
} from './styles';

export default function Scheduling(): ReactElement {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header>
        <BackButton color={theme.colors.shape} onPress={() => {}} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueArea selected={false}>
              <DateValue></DateValue>
            </DateValueArea>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueArea selected={false}>
              <DateValue></DateValue>
            </DateValueArea>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>

      </Content>

      <Footer>
        <Button title="Confirmar" />
      </Footer>

    </Container>
  );
}
