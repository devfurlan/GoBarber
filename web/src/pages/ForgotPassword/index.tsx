import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
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

interface IForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: IForgotPasswordFormData) => {
    setLoading(true);

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um email válido').required('E-mail obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/password/forgot', {
        email: data.email,
      });

      addToast({
        type: 'success',
        title: 'E-mail de recuperação enviado',
        description: 'Enviamos um e-mail para confirmação de senha, verifique sua caixa de entrada e o spam =)',
      });

      // history.push('/dashboard');
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const errors = getValidationErrors(e);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'danger',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  return (
    <Container>
      <AnimationContainer>
        <Content>
          <img src={logoImg} alt=""/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} type="email" placeholder="E-mail"/>

            <Button loading={loading} type="submit">Recuperar</Button>
          </Form>

          <Link to="/" className="link_sign">
            <FiArrowLeft/>
            Voltar ao login
          </Link>
        </Content>
      </AnimationContainer>

      <Background/>
    </Container>
  );
};

export default ForgotPassword;
