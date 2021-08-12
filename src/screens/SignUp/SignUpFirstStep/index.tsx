import React, { ReactElement } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

import BackButton from '../../../components/BackButton';
import Bullet from '../../../components/Bullet';
import Input from '../../../components/Input';
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

export default function SignUpFirstStep(): ReactElement {
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
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
            />
          </Form>

          <Button
            title="Próximo"
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
