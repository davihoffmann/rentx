import React, { ReactElement, useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, IconContainer, InputText, ChangePasswordVisibilityButton } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export default function PasswordInput({
  iconName,
  ...rest
}: Props): ReactElement {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  function handlePasswordVisibilityChange() {
    setShowPassword(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>

      <InputText 
        {...rest}
        secureTextEntry={!showPassword}
      />

      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
      
        <Feather
          name={showPassword ? 'eye' : 'eye-off'}
          size={24}
          color={theme.colors.text_detail}
        />
      
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
