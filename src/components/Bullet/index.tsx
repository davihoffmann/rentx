import React, { ReactElement } from 'react';

import { Container } from './styles';

interface BulletProps {
  active?: boolean;
}

export default function Bullet({ active = false }: BulletProps): ReactElement {
  return (
    <Container active={active} />
  );
}
