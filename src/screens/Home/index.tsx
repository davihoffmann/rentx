
import React, { ReactElement, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import { Car as ModelCar } from '../../database/models/Car';
import api from '../../services/api';

import Car from '../../components/Car';
import LoadAnimation from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { 
   Container, 
   Header,
   HeaderContent,
   TotalCards,
   CarList,
} from './styles';
 
export default function Home(): ReactElement {
  const navigation = useNavigation();

  const netInfo = useNetInfo();

  const [cars, setCars] = useState<ModelCar[]>([]);
  const [isLoading, setLoading] = useState(true);

  function handleCarDetails(car: ModelCar) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'CarDetails',
        params: {
          car
        }
      })
    );
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user).catch(console.log);
      }
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if(isMounted) {
          setCars(cars);
        }
      } catch(error) {
        console.error(error);
      } finally {
        if(isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if(netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

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
          {
            !isLoading && (
              <TotalCards>{`Total de ${cars.length} carros`}</TotalCards>
            )
          }          
        </HeaderContent>
      </Header>

      {
        isLoading ? (
          <LoadAnimation />
        ) : (
          <CarList 
            data={cars} 
            keyExtractor={item => item.id}
            renderItem={({ item }) => (<Car onPress={() => handleCarDetails(item)} data={item} />)}
          />
        )
      }
    </Container>
  );
}
