import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface IResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: IResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().min(6, 'No mínimo 6 caracteres'),
        password_confirmation: Yup.string().min(6, 'No mínimo 6 caracteres').oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
      });

      await schema.validate(data, { abortEarly: false });

      const { password, password_confirmation } = data;
      const token = location.search.replace('?token=', '');

      if (!token) {
        throw new Error();
      }

      await api.post('password/reset', {
        password,
        password_confirmation,
        token,
      });

      addToast({
        type: 'success',
        title: 'Senha alterada com sucesso',
        description: 'Faça o login, com sua nova senha, para acessar sua conta.',
      });

      history.push('/');
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const errors = getValidationErrors(e);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'danger',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
      });
    }
  }, [addToast, history, location]);

  return (
    <Container>
      <AnimationContainer>
        <Content>
          <img src={logoImg} alt=""/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Alterar senha</h1>

            <Input name="password" icon={FiLock} type="password" placeholder="Nova senha"/>
            <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmação de senha"/>

            <Button type="submit">Alterar senha</Button>
          </Form>
        </Content>
      </AnimationContainer>

      <Background/>
    </Container>
  );
};

export default ResetPassword;
