import React, { ReactElement } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { Car as ModelCar } from '../../database/models/Car';
import { getAcessoryIcon } from '../../utils/getAccessoryIcon';

import { 
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './styles';

interface Props extends RectButtonProps {
  data: ModelCar;
}

export default function Car({ data, ...rest }: Props): ReactElement {
  const MotorIcon = getAcessoryIcon(data.fuel_type);

  const netInfo = useNetInfo();

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>
              {netInfo.isConnected === true ? `R$ ${data.price}` : '...'}
            </Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}
