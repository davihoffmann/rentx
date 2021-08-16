import React, { ReactElement, useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert
} from 'react-native';
import { useNavigation, CommonActions, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import api from '../../../services/api';

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


interface Params {
  user: {name: string, email: string, driverLicense: string}
}

export default function SignUpSecondStep(): ReactElement {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  async function handleRegister() {
    if(!password || !passwordConfirm) {
      Alert.alert('Informe a senha e a confirmação de senha');
      return;
    }

    if(password !== passwordConfirm) {
      Alert.alert('As senha não são iguais');
      return;
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    })
    .then(() => {
      navigation.dispatch(CommonActions.navigate('Confirmation', { 
        title: 'Conta Criada', 
        message: 'Agora é so fazer login \n e aproveitar', 
        nextScreenRoute: 'SignIn'
      }));
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Opa', 'Não foi possível cadastrar')
    });
  }

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
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
