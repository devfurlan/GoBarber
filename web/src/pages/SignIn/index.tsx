import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ISignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um email válido').required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const errors = getValidationErrors(e);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'danger',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer o login, verifique suas credenciais.',
      });
    }
  }, [signIn, addToast]);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt=""/>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <Input name="email" icon={FiMail} type="email" placeholder="E-mail"/>
          <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="#">
          <FiLogIn/>
          Criar conta
        </a>
      </Content>

      <Background/>
    </Container>
  );
};

export default SignIn;