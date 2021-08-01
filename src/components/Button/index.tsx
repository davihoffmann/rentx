import React, { ReactElement } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
}

export default function Button({ title, color, ...rest }: Props): ReactElement {
  return (
    <Container color={color} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
