import React, { ReactElement, useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from 'styled-components';

import BackButton from '../../components/BackButton';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

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

interface CarProps {
  id: number;
  user_id: number;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export default function MyCars(): ReactElement {
  const navigation = useNavigation()
  const theme = useTheme();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const result = await api.get('/schedules_byuser?user_id=1');
        setCars(result.data);
      } catch(error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

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
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      
                      <AntDesign 
                        name="arrowright" 
                        size={20} 
                        color={theme.colors.title} 
                        style={{ marginHorizontal: 10 }}
                      />
                      
                      <CarFooterDate>{item.endDate}</CarFooterDate>
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
