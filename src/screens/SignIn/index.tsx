import React, { ReactElement, useState } from 'react';
import { 
  StatusBar,
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Keyboard,
  Alert
 } from 'react-native';
 import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';

import { 
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer
 } from './styles';
import { useNavigation, CommonActions } from '@react-navigation/native';


export default function SignIn(): ReactElement {
  const { signIn } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function hanldeNewAccount() {
    navigation.dispatch(CommonActions.navigate('SignUpFirstStep'))
  }

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha é obrigatória')
      });
  
      await schema.validate({email, password});
      Alert.alert('Tudo certo!');

      await signIn({ email, password });
    } catch(error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro a fazer login!');
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos {'\n'} 
              quase lá
            </Title>

            <SubTitle>
              Faça seu login para começar {'\n'} 
              uma experiência incrível
            </SubTitle>
          </Header>

          <Form>
            <Input 
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button 
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button 
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={hanldeNewAccount}
              enabled={true}
              loading={false}
              light
            />
          </Footer>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
