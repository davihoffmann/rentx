import React, { ReactElement } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import BackButton from '../../../components/BackButton';
import Bullet from '../../../components/Bullet';
import PasswordInput from '../../../components/PasswordInput';
import Button from '../../../components/Button';

import { 
  Container, 
  Header, 
  Steps, 
  Title, 
  Subtitle, 
  Form, 
  FormTitle
} from './styles';

export default function SignUpSecondStep(): ReactElement {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.dispatch(CommonActions.goBack());
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crise sua{'\n'}conta
          </Title>
          <Subtitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
            />
            <PasswordInput 
              iconName="lock"
              placeholder="Repetir Senha"
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
