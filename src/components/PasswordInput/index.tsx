import React, { ReactElement, useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, IconContainer, InputText, ChangePasswordVisibilityButton } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export default function PasswordInput({
  iconName,
  value,
  ...rest
}: Props): ReactElement {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    setShowPassword(prevState => !prevState);
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
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
