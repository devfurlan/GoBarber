import React, { useCallback, useRef } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import ImagePicker from 'react-native-image-picker';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackButton,
  UserAvatarButton,
  UserAvatar,
  Content,
} from './styles';
import { useAuth } from '../../hooks/auth';
import Icon from 'react-native-vector-icons/Feather';

interface IProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleProfileChange = useCallback(async (data: IProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val: string | any[]) => !!val.length,
          then: Yup.string().min(6, 'No mínimo 6 caracteres'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: (val: string | any[]) => !!val.length,
          then: Yup.string().min(6, 'No mínimo 6 caracteres'),
          otherwise: Yup.string(),
        }).oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
      });

      await schema.validate(data, { abortEarly: false });

      const { name, email, old_password, password, password_confirmation } = data;

      const formData = Object.assign({
        name,
        email,
      }, old_password ? {
        old_password,
        password,
        password_confirmation,
      } : {});

      const response = await api.put('/profile', formData);

      await updateUser(response.data);

      Alert.alert('Perfil atualizado com sucesso!');

      navigation.goBack();
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const errors = getValidationErrors(e);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na atualização do perfil.',
        'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
      );
    }
  }, [navigation, updateUser]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdateUser = useCallback(() => {
    ImagePicker.showImagePicker({
      title: 'Selecione um avatar',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar câmera',
      chooseFromLibraryButtonTitle: 'Escolha da galeria',
    }, response => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        Alert.alert('Erro ao atualizar seu avatar.');
      }

      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpg',
        name: `${user.id}.jpg`,
        uri: response.uri,
      });

      api.patch('users/avatar', data).then(apiResponse => updateUser(apiResponse.data));
    });
  }, [updateUser, user.id]);

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <Content>
            <Container>

              <BackButton onPress={handleGoBack}>
                <Icon name="chevron-left" size={24} color="#999591"/>
              </BackButton>

              <UserAvatarButton onPress={handleUpdateUser}>
                <UserAvatar source={{ uri: user.avatar_url }}/>
              </UserAvatarButton>

              <View>
                <Title>Meu perfil</Title>
              </View>

              <Form ref={formRef} initialData={user} onSubmit={handleProfileChange}>
                <Input
                  autoCapitalize="words"
                  name="name"
                  icon="user"
                  placeholder="Nome"
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                />

                <Input
                  ref={emailInputRef}
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  name="email"
                  icon="mail"
                  placeholder="E-mail"
                  returnKeyType="next"
                  onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
                />

                <Input
                  ref={oldPasswordInputRef}
                  name="old_password"
                  icon="lock"
                  placeholder="Senha atual"
                  secureTextEntry
                  textContentType="newPassword"
                  returnKeyType="next"
                  containerStyle={{ marginTop: 16 }}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />

                <Input
                  ref={passwordInputRef}
                  name="password"
                  icon="lock"
                  placeholder="Nova senha"
                  secureTextEntry
                  textContentType="newPassword"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordConfirmationInputRef.current?.focus()}
                />

                <Input
                  ref={passwordConfirmationInputRef}
                  name="password_confirmation"
                  icon="lock"
                  placeholder="Confirmar senha"
                  secureTextEntry
                  textContentType="newPassword"
                  returnKeyType="send"
                  onSubmitEditing={() => formRef.current?.submitForm()}
                />

                <Button onPress={() => formRef.current?.submitForm()}>Confirmar mudanças</Button>
              </Form>

            </Container>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
