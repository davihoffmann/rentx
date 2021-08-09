import React, { ReactElement } from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export default function Button({ 
  title, 
  color, 
  enabled = true, 
  loading = false, 
  light = false,  
  ...rest }: Props
): ReactElement {
  const theme = useTheme();
  return (
    <Container 
      color={color} 
      style={{ opacity: (!enabled || loading) ? 0.5 : 1 }}
      enabled={enabled}
      {...rest}
    >
      { 
        loading 
        ? (<ActivityIndicator color={theme.colors.shape} />)
        : (<Title light={light}>{title}</Title>)
      }
    </Container>
  );
}
