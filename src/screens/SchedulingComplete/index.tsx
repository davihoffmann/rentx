import React, { ReactElement } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import ConfirmButton from '../../components/ConfirmButton'

import { 
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

export default function SchedulingComplete(): ReactElement {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  function handleConfirm() {
    navigation.dispatch(
      CommonActions.navigate('Home')
    );
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você so precisa ir{'\n'}
          até a concessionária da RENTX{'\n'}
          pegar seu automóvel
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
