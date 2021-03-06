import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useToast } from '../../hooks/toast';

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ISignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
        password: Yup.string().min(6, 'No mínimo 6 caracteres'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode acessar o GoBarber',
      });
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const errors = getValidationErrors(e);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'danger',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Background/>

      <AnimationContainer>
        <Content>
          <img src={logoImg} alt=""/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome"/>
            <Input name="email" icon={FiMail} type="email" placeholder="E-mail"/>
            <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/" className="link_sign">
            <FiArrowLeft/>
            Voltar para login
          </Link>
        </Content>
      </AnimationContainer>
    </Container>
  );
};

export default SignUp;