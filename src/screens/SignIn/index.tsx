import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import Button from '../../components/Button';

import { 
  Container,
  Header,
  Title,
  SubTitle,
  Footer
 } from './styles';

export default function SignIn(): ReactElement {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>
          Estamois {'\n'} 
          quase lá
        </Title>

        <SubTitle>
          Faça seu login para começar {'\n'} 
          uma experiência incrível
        </SubTitle>
      </Header>

      <Footer>
        <Button 
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button 
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          onPress={() => {}}
          enabled={false}
          loading={false}
          light
        />
      </Footer>

    </Container>
  );
}
