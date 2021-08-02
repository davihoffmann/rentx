import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import BackButton from '../../components/BackButton';
import Calendar from '../../components/Calendar';
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
  const navigation = useNavigation();
  const theme = useTheme();

  function handleConfirmRental() {
    navigation.dispatch(
      CommonActions.navigate('SchedulingDetails')
    );
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header>
        <BackButton color={theme.colors.shape} onPress={() => navigation.goBack()} />

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
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>

    </Container>
  );
}
