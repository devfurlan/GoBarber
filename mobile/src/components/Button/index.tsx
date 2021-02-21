import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface IButtonProps extends RectButtonProps {
  children: string;
}

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
