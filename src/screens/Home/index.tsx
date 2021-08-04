
import React, { ReactElement, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import Car from '../../components/Car';
import Load from '../../components/Load';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { 
   Container, 
   Header,
   HeaderContent,
   TotalCards,
   CarList,
   MyCarsButton
} from './styles';
 
export default function Home(): ReactElement {
  const navigation = useNavigation();
  const theme = useTheme();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const result = await api.get('/cars');
        setCars(result.data);
      } catch(error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'CarDetails',
        params: {
          car
        }
      })
    );
  }

  function handleMyCars() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'MyCars'
      })
    );
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent
      />

      {
        isLoading ? (
          <Load />
        ) : (
          <>
            <Header>
              <HeaderContent>
                <Logo width={RFValue(108)} height={RFValue(12)} />

                <TotalCards>Total de 12 carros</TotalCards>
              </HeaderContent>
            </Header>

            <CarList 
              data={cars} 
              keyExtractor={item => item.id}
              renderItem={({ item }) => (<Car onPress={() => handleCarDetails(item)} data={item} />)}
            />
          </>
        )
      }

      <MyCarsButton onPress={handleMyCars}>
        <Ionicons 
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}
 