import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {
  Container,
  Title,
  Description,
  OKButton,
  OKButtonText,
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

interface IRouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as IRouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [
        { name: 'Dashboard' },
      ],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(routeParams.date, "EEEE', ' dd 'de' MMMM 'de' yyyy ', às' H'h'", {locale: ptBR});
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361"/>

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OKButton onPress={handleOkPressed}>
        <OKButtonText>Voltar ao dashboard</OKButtonText>
      </OKButton>
    </Container>
  );
};

export default AppointmentCreated;
