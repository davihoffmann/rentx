import React, { ReactElement, useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import { useTheme } from 'styled-components';
import { format, parseISO } from 'date-fns';

import BackButton from '../../components/BackButton';

import api from '../../services/api';
import { Car as ModelCar } from '../../database/models/Car';

import { 
  Container, 
  Header, 
  Title, 
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import Car from '../../components/Car';
import Load from '../../components/Load';

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export default function MyCars(): ReactElement {
  const navigation = useNavigation();
  const screenIsFocus = useIsFocused();
  const theme = useTheme();

  const [cars, setCars] = useState<DataProps[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const result = await api.get('/rentals');
        const dataFormatted = result.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
          }
        })
        setCars(dataFormatted);
      } catch(error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [screenIsFocus]);

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

        <SubTitle>
          Conforto, segunrança e praticidade
        </SubTitle>
      </Header>
    
      {
        isLoading ? (
          <Load />
        ) : (
          <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>

            <FlatList
              data={cars}
              keyExtractor={item => String(item.id)}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.start_date}</CarFooterDate>
                      
                      <AntDesign 
                        name="arrowright" 
                        size={20} 
                        color={theme.colors.title} 
                        style={{ marginHorizontal: 10 }}
                      />
                      
                      <CarFooterDate>{item.end_date}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </Content>
        )
      }
    </Container>
  );
}
