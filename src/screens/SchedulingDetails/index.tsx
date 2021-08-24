import React, { ReactElement, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, CommonActions, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';
import { format } from 'date-fns';

import api from '../../services/api';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Accessory from '../../components/Accessory';
import Button from '../../components/Button';

import { getAcessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer
} from './styles';


interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export default function SchedulingDetails(): ReactElement {
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const netInfo = useNetInfo();

  const [ carUpdated, setCarUpdated ] = useState<CarDTO>({} as CarDTO);
  const [isLoading, setIsLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const rentTotal = (Number(dates.length) * car.price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, []);

  async function handleConfirm() {
    setIsLoading(true);
    
    await api.post('/rentals', {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]), //format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end_date: new Date(dates[dates.length - 1]), // format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
      total: rentTotal
    }).then(() => 
      navigation.dispatch(CommonActions.navigate('Confirmation', { 
        title: 'Carro alugado!', 
        message: 'Agora você so precisa ir\naté a concessionária da RENTX\npegar seu automóvel', 
        nextScreenRoute: 'Home'
      }))
    ).catch(error => {
      console.error(error);
      setIsLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.');
    });
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>

      <CarImages>
        <ImageSlider imageUrl={
          !!carUpdated.photos ? carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]
        } />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$ ${car.price}`}</Price>
          </Rent>
        </Details>

        {
          carUpdated.accessories && (
            <Acessories>
              {
                carUpdated.accessories.map(accessory => (
                  <Accessory key={accessory.type} name={accessory.name} icon={getAcessoryIcon(accessory.type)} />
                ))
              }
            </Acessories>
          )
        }

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather 
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
      
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
          <Button 
            title="Alugar agora" 
            color={theme.colors.success} 
            onPress={handleConfirm}
            enabled={!isLoading}
            loading={isLoading}
          />
      </Footer>
    </Container>
  )
}