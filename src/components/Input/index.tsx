import React, { ReactElement } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, IconContainer, InputText } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export default function Input({
  iconName,
  ...rest
}: Props): ReactElement {
  const theme = useTheme();
  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>

      <InputText {...rest} />
    </Container>
  );
}